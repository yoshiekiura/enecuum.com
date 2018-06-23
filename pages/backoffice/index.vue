<template>
  <section class="container account">
    <h1 class="text-center page-title">Personal account</h1>
    <el-row class="flex-center events">
      <el-col :xs="22" :sm="10" :md="12" :xl="10">
        <el-row :gutter="30" class="flex-center flex-wrap flex-column">
          <h3 class="text-center title-semibold text-uppercase mb13">Your balance</h3>
          <h4 class="text-center title-bold title-middle mb13">ENQ 00,00000000</h4>
          <el-alert
            class="enq-alert"
            :title="'Be aware! Contributing is available only for the legally approved whitelisted wallets. Using exchanges is prohibited! You can contribute only directly from your wallet: '+userInfo.wallet"
            type="info"
            :closable="false">
          </el-alert>
          <h4 class="text-center title-bold title-middle mb13 flex-center flex-middle addr-wrapper">
            <span class="addr">0x*****************************</span> <img v-if="dev"
                                                                           src="/img/icons/copy.svg"
                                                                           class="ml13 account-copy"
                                                                           alt="" @click="copy"></h4>
          <el-alert
            title="Your wallet is not whitelisted yet, please wait"
            type="warning"
            center
            :closable="false" v-if="!verified"></el-alert>
        </el-row>
      </el-col>
    </el-row>
    <accountForm v-if="dev" :verified="verified"></accountForm>
    <tokenVesting v-if="dev" :userInfo="userInfo" :verified="verified"></tokenVesting>
    <el-row class="flex-center">
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

  export default {
    name: "faq",
    middleware: 'auth',
    data() {
      return {
        verified: false,
        dev: this.$store.state.debug,
        userInfo: {
          wallet: ''
        },
      }
    },
    components: {
      accountForm,
      tokenVesting
    },
    methods: {
      copy() {
        let inp = document.createElement('input');
        inp.value = this.userInfo.wallet;
        inp.classList.add('forselect');
        inp.style.position = 'fixed';
        inp.style.top = '-100%';
        inp.style.left = '-100%';
        document.body.appendChild(inp);
        let addr = document.querySelector('input.forselect');
        if (document.createRange) {
          addr.select();
          document.execCommand('copy');
          this.$message('Wallet copied');
        }
        addr.remove();
      }
    },
    mounted() {
      this.userInfo = this.$store.state.kyc.message;
    }
  }
</script>
