<template>
  <section class="container account">
    <h1 class="text-center page-title">Personal account</h1>
    <el-row class="flex-center">
      <el-col :xs="22" :sm="10" :md="12" :xl="10">
        <el-row :gutter="30" class="flex-center flex-wrap flex-column">
          <h3 class="text-center title-semibold text-uppercase mb13">Your balance</h3>
          <h4 class="text-center title-bold title-middle mb13">ENQ
            <ICountUp
              :startVal="0"
              :endVal="userInfo.balance"
              :decimals="10"
              :duration="4"
              :options="easingOptions"
            />
          </h4>
          <el-alert
            class="enq-alert"
            :title="'Be aware! Contributing is available only for the legally approved whitelisted wallets. Using exchanges is prohibited! You can contribute only directly from your wallet: '+userInfo.wallet"
            type="info"
            :closable="false">
          </el-alert>
          <el-alert
            title="address for contribute"
            type="warning"
            class="mt13 mb13"
            v-if="verified"
            center
            :closable="false">
          </el-alert>
          <el-alert
            title="Maximum amount of contribution is 2 million dollars, all transactions that exceed the limits will be reverted"
            type="info"
            class="mb40 mt13"
            v-if="verified"
            center
            :closable="false">
          </el-alert>
          <h4 class="text-center title-bold title-middle mb0 flex-center flex-middle addr-wrapper">
            <span
              class="addr" v-if="verified">{{contractInfo.contractAddress}}</span>
            <img src="/img/icons/copy.svg"
                 class="ml13 account-copy"
                 v-if="verified"
                 alt="" @click="copy"></h4>
          <el-alert
            title="Your wallet is not whitelisted yet, please wait"
            type="warning"
            center
            class="mt40 mb40"
            :closable="false" v-if="!verified"></el-alert>
        </el-row>
        <el-row class="flex-center">
          <el-alert
            :title="'Your current coinbase account is set to ' + userInfo.currentWallet + ', but it must be equal to ' + userInfo.wallet"
            v-if="web3info.text==='Waiting for changing your coinbase account'"
            type="error"
            class="mt40"
            center
            :closable="false">
          </el-alert>
        </el-row>
      </el-col>
    </el-row>
    <accountForm v-if="verified" :web3info="web3info" :address="contractInfo.contractAddress"
                 :verified="verified" :userInfo="userInfo"></accountForm>
    <tokenVesting v-if="false" :userInfo="userInfo" :verified="verified"></tokenVesting>
    <el-row class="flex-center mb40">
      <el-col :xs="22" :sm="16" :md="16" :lg="14" :xl="14">
        <p class="text-center">If you have any more questions, please email our support at <br> <a
          href="mailto:support@enecuum.com">support@enecuum.com</a></p>
        <h3 class="text-center title-under mb13"><a href="/docs/Enecuum_TokenSale_Terms_and_Conditions.pdf"
                                                    target="_blank">Token Sale Terms and Conditions</a></h3>
      </el-col>
    </el-row>
  </section>
</template>

<script>
  import accountForm from '@/components/account/accountForm';
  import tokenVesting from '@/components/account/tokenVesting';
  import socket from '~/plugins/socket.io.js';
  import ICountUp from 'vue-countup-v2';
  import bn from 'bignumber.js';

  export default {
    name: "faq",
    middleware: 'auth',
    data() {
      return {
        web3info: {
          loaded: false,
          text: 'Waiting for MetaMask or Mist Browser'
        },
        verified: false,
        contractInfo: {
          contractAddress: require('./../../config/config').web3.mainnet.contracts.wallet.address
        },
        userInfo: {
          wallet: '',
          currentWallet: '',
          balance: 0,
          currentNetwork: ''
        },
        easingOptions: {
          useEasing: true,
          useGrouping: true,
          separator: '',
          decimal: '.',
        }
      }
    },
    components: {
      accountForm,
      tokenVesting,
      ICountUp
    },
    methods: {
      copy() {
        let inp = document.createElement('input');
        inp.value = this.contractInfo.contractAddress;
        inp.classList.add('forselect');
        inp.style.position = 'fixed';
        inp.style.top = '-100%';
        inp.style.left = '-100%';
        document.body.appendChild(inp);
        let addr = document.querySelector('input.forselect');
        if (document.createRange) {
          addr.select();
          document.execCommand('copy');
          this.$notify({
            type: 'info',
            message: 'Wallet address was copied to your clipboard',
            position: 'bottom-left',
          });
        }
        addr.remove();
      },
      detectNetwork() {
        let address = '';
        web3.version.getNetwork((err, netId) => {
          switch (netId) {
            case "1":
              this.web3info.text = 'Connecting to MainNet';
              this.contractInfo.contractAddress = require('./../../config/config').web3.mainnet.contracts.wallet.address;
              address = this.contractInfo.contractAddress;
              break;
            case "2":
              this.web3info.text = 'You\'re using deprecated Morden test network';
              setTimeout(() => {
                this.detectNetwork();
              }, 15000);
              break;
            case "3":
              this.web3info.text = 'Connecting to Ropsten';
              this.userInfo.currentNetwork = 'ropsten.';
              this.contractInfo.contractAddress = require('./../../config/config').web3.ropsten.contracts.wallet.address;
              address = this.contractInfo.contractAddress;
              break;
            default:
              this.web3info.text = 'Connect to MainNet or Ropsten';
              setTimeout(() => {
                this.detectNetwork();
              }, 15000);
          }
          if (web3.eth.accounts.length < 1) {
            this.web3info.text = 'Please unlock your account';
            setTimeout(() => {
              this.detectNetwork();
            }, 15000);
            return false;
          }
          if (address) setTimeout(() => {
            web3.eth.getCoinbase((error, result) => {
              if (error) {
                this.web3info.text = 'Wa can\'t detect your coinbase account';
                setTimeout(() => {
                  this.detectNetwork();
                }, 15000);
              } else {
                this.userInfo.currentWallet = result;
                this.$store.commit('SET_WEB3WALLET', result);
                if (this.userInfo.wallet.toLocaleLowerCase() !== result.toLocaleLowerCase()) {
                  this.web3info.text = 'Waiting for changing your coinbase account';
                  setTimeout(() => {
                    this.detectNetwork();
                  }, 15000);
                } else {
                  this.web3info.loaded = true;
                }
              }
            });
          }, 2000);
        });
      }
    },
    mounted() {
      this.userInfo = this.$store.state.kyc.message;
      this.userInfo.balance = this.userInfo.balance ? this.userInfo.balance : "0";
      this.userInfo.balance = bn(bn(this.userInfo.balance).dividedBy("1e10").toFixed(10)).toNumber();
      socket.on('depositUpdates', (info) => {
        let me = (this.$store.state.web3wallet.toLocaleLowerCase() === info.sender.toLocaleLowerCase()) ? true : false;
        me ? (this.userInfo.balance = bn(bn(this.userInfo.balance).plus(bn(info.amount))).toNumber()) : null;
      });
    },
    created() {
      if (this.$store.state.kyc.code === 200) {
        this.verified = true;
        setTimeout(() => {
          if (typeof web3 !== 'undefined') {
            this.web3info.text = 'Detecting Network';
            this.detectNetwork();
          }
        }, 1000);
      }
    }
  }
</script>
