const mysql = require(require.resolve('mysql'));
const request = require(require.resolve('request'));
const BigNumber = require(require.resolve('bignumber.js'));


let pool = mysql.createPool({
  connectionLimit: 20,
  user: process.env.db_user,
  password: process.env.db_password,
  host: process.env.db_host,
  database: process.env.db_name
});

function query({sender, token}) {
  pool.getConnection((err, connection) => {
    if (err) {
      console.log('error:', err.stack);
      return;
    }
    console.log('connected to pool');
    let initialAmountQuery = "SELECT u.balance FROM users AS u JOIN kyc AS k ON u.id = k.user_id LEFT JOIN kyc_individual AS i ON (k.accountType = 1 AND u.id = i.user_id) LEFT JOIN kyc_company AS c ON (k.accountType = 2 AND u.id = c.user_id) WHERE k.accountType IS NOT NULL AND (EXISTS(SELECT i.user_id FROM kyc_individual AS i WHERE i.user_id = u.id) OR EXISTS(SELECT c.user_id FROM kyc_company WHERE c.user_id = u.id)) AND k.status = 4 AND (i.ethWalletNumber = '" + sender + "' OR c.ethWalletNumber = '" + sender + "') ORDER BY u.id ASC LIMIT 1";
    connection.query(initialAmountQuery, (error, res) => {
      try {
        console.log(res);
        if (res) {
          let initialAmount = parseInt(res[0].balance) ? parseInt(res[0].balance) : null;
          console.log(BigNumber(initialAmount).toNumber(), BigNumber(token).shiftedBy(10).toNumber(), BigNumber(initialAmount).plus(BigNumber(token).shiftedBy(10)).toNumber());
          let query = "UPDATE users AS u JOIN kyc AS k ON u.id = k.user_id LEFT JOIN kyc_individual AS i ON (k.accountType = 1 AND u.id = i.user_id) LEFT JOIN kyc_company AS c ON (k.accountType = 2 AND u.id = c.user_id) SET u.balance = '" + (BigNumber(initialAmount).isNaN() ? BigNumber(token).shiftedBy(10) : BigNumber(initialAmount).plus(BigNumber(token).shiftedBy(10))) + "' WHERE k.accountType IS NOT NULL AND (EXISTS(SELECT i.user_id FROM kyc_individual AS i WHERE i.user_id = u.id) OR EXISTS(SELECT c.user_id FROM kyc_company WHERE c.user_id = u.id)) AND k.status = 4 AND (i.ethWalletNumber = '" + sender + "' OR c.ethWalletNumber = '" + sender + "') ORDER BY u.id ASC LIMIT 1";
          connection.query(query, (err) => {
            console.log('success query');
            if (err) console.log(err);
          })
        }
      } catch (e) {
      }
    });
  });
}

function setFirstBlock(block) {
  let query = "UPDATE eth SET blockNumber='" + block + "' WHERE 1";
  pool.getConnection((err, connection) => {
    if (err) {
      console.log('error:', err.stack);
      return;
    }
    connection.query(query, (error, res) => {
      console.log('current block to db: ', res);
    });
  });
}

function getFirstBlock() {
  return new Promise(resolve => {
    let query = "SELECT blockNumber FROM eth WHERE 1";
    pool.getConnection((err, connection) => {
      if (err) {
        console.log('error:', err.stack);
        return;
      }
      connection.query(query, (error, res) => {
        console.log('current block from db: ', res);
        resolve(res);
      });
    });
  });
}

function sendLog({tx, sender, ether, usd, token}) {
  request('backend.site' + "/log?err=New Tx&url=https://" + (process.env.dev ? "ropsten." : "") + "etherscan.io/tx/" + tx + "&line=]&ua=data: " + ether + " ether from " + sender + " (" + usd + " usd / " + BigNumber(token).toFixed(10) + " enq)", (err, res) => {
    if (err) console.log(err);
  });
}

function sendPureLog(data) {
  request('backend.site' + "/log?err=Info&url=[&line=]&ua=data: " + data, (err, res) => {
    if (err) console.log(err);
  });
}

module.exports = {
  query,
  sendLog,
  sendPureLog,
  setFirstBlock,
  getFirstBlock
}
