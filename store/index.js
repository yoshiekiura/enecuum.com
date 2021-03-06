import Vuex from 'vuex';

import mutations from './mutations';
import getters from './getters';
import actions from './actions';

const createStore = () => {
  return new Vuex.Store({
    state: {
      debug: false,
      cookies: '',
      kyc: {},
      web3wallet: '',
      isAuth: false,
      curLang: 'en',
      cq_user: null,
      lang: {},
      info2fa: {},
      "social": [{
        "img": 'img/snet/gh.svg',
        "type": "github",
        "link": 'https://github.com/Enecuum'
      }, {
        "img": 'img/snet/med.svg',
        "type": "medium",
        "link": 'https://medium.com/@EnqBlockchain'
      }, {
        "img": 'img/snet/sm.svg',
        "type": "reddit",
        "link": 'https://www.reddit.com/user/enecuum'
      }, {
        "img": 'img/snet/tw.svg',
        "type": "twitter",
        "link": 'https://twitter.com/enq_enecuum'
      }, {
        "img": 'img/snet/fb.svg',
        "type": "facebook",
        "link": 'https://www.facebook.com/enecuum.EN/?ref=bookmarks'
      }, {
        "img": 'img/snet/tm.svg',
        "type": "telegram",
        "link": 'https://t.me/Enecuum_EN'
      }, {
        "img": 'img/snet/bt.svg',
        "type": "bitcointalk",
        "link": 'https://bitcointalk.org/index.php?topic=2939909.0;topicseen'
      }, {
        "img": 'img/snet/lk.svg',
        "type": "linkedin",
        "link": 'https://www.linkedin.com/company/enecuum-limited/'
      }, {
        "img": 'img/snet/dis.svg',
        "type": "discord",
        "link": 'https://discord.gg/aCgCcA2'
      }, {
        "img": 'img/snet/yt.svg',
        "type": "youtube",
        "link": 'https://www.youtube.com/channel/UCyZqNfzK_PP82nkAVOlmN4Q?view_as=subscriber'
      }],
      "calendar": {
        "title": "Calendar",
        "seemore": "See More",
        "events": [
          {
            "date": "04-03-2018 | 04-04-2018",
            "img": "img/calendar/deconomy.png",
            "title": "DECONOMY 2018",
            "place": "Seoul, Korea, Walkerhill Hotel",
            "description": "Deconomy will hold its first annual blockchain forum in Seoul, South Korea, the critical hub of blockchain and cryptocurrency. Amidst high interest in the field, Deconomy 2018 will gather the brightest entrepreneurs, thought leaders, investors, developers, academic and policy groups, and blockchain enthusiasts. The forum consists of a two-day program, with keynote presentations and panel discussions about major topics surrounding the industry.",
            "link": "https://deconomy.com"
          },
          {
            "date": "04-12-2018 | 04-13-2018",
            "img": "img/calendar/startupcamp.png",
            "title": "STARTUP CAMP 2018",
            "place": "Germany, Berlin, Siemens Conference Center Berlin",
            "description": "Get the chance to make new contacts and learn about interesting ideas at the Startup Expo. More than 30 startups from various fields showcase their products and innovations.",
            "link": "https://scb18.de"
          },
          {
            "date": "04-16-2018 | 04-17-2018",
            "img": "img/calendar/wbf.png",
            "title": "WORLD BLOCKCHAIN FORUM",
            "place": "United Arab Emirates, Dubai, Madinat Jumeirah Conference Center",
            "description": "Join visionary leaders, economic pioneers and enterprising investors from around the world as they discuss the future of our financial world at Keynote’s newest and most exclusive event –  WBF: WORLD BLOCKCHAIN FORUM. Held at Jumeirah Mina A’Salam, this two-day conference delves into the innovative possibilities of blockchain and disruptive technologies, provides an introduction to ICOs.",
            "link": "https://dubai.keynote.ae"
          },
          {
            "date": "04-17-2018",
            "img": "img/calendar/blocksocial.png",
            "title": "BLOCKSOCIAL",
            "place": "UAE, DUBAI",
            "description": "Blockchain Socail Impact Learn how Blockchain can bring about a revolution in the lives of millions and how it holds the potential for bringing a positive change in the society. ENQ team will tell you about future of blockchain technologies and how can it change our life including solving of social problems",
            "link": "https://event.myblocksocial.com/dubai/"
          },
          {
            "date": "04-24-2018",
            "img": "img/calendar/blockshow.png",
            "title": "BLOCKSHOW MEETUP",
            "place": "Switzerland, Zurich, Kraftwerk",
            "description": "BlockShow Meetups are for unique & cool start up projects, investors, business owners, blockchain & bitcoin enthusiasts and pretty much anyone who shares an interest in Blockchain, Cryptocurrencies and ICOs.",
            "link": "https://blockshoweurope.com/meetups/zurich/"
          },
          {
            "date": "04-26-2018",
            "img": "img/calendar/blockchain_summit_april.png",
            "title": "BLOCKCHAIN SUMMIT 2018",
            "place": "Switzerland, Gotthardstrasse",
            "description": "A new year – and blockchain continues to grow and expand around the world, changing business and spurring new innovation. The 2nd Blockchain Summit – Crypto Valley focuses on the intersection of enterprise and startup approaches to building new things with distributed ledger technology.",
            "link": "https://blockchainsummit.ch"
          },
          {
            "date": "05-01-2018 | 05-03-2018",
            "img": "img/calendar/wdas.png",
            "title": "WDAS",
            "place": "SINGAPORE",
            "description": "World Digital Asset Summit (“WDAS”) Singapore 2018 is an inaugural conference to connect the best-in-class blockchain projects, developers and investors globally. Our mission is to explore in-depth discussion on “tokenomics” and its burgeoning impact on the traditional economy. Join us at this exclusive gathering with a group of diverse community leaders, brought to you by FBG Capital.",
            "link": "http://wdas.world/"
          },
          {
            "date": "05-03-2018 | 05-04-2018",
            "img": "img/calendar/letsgo.png",
            "title": "THE ARCH SUMMIT",
            "place": "Luxembourg, Luxexpo",
            "description": "Meet the who's who of tech industry right here at the Arch Summit. Know what's happening & what's about to be disrupted by the leaders who are in charge of tomorrow.",
            "link": "https://www.archsummit.lu/tickets/"
          },
          {
            "date": "05-08-2018",
            "img": "img/calendar/blockchain_summit.png",
            "title": "BLOCK O2O BLOCKCHAIN SUMMIT",
            "place": "Hong Kong, PMQ",
            "description": "The Block O2O Blockchain Summit gathers the blockchain ecosystem of the world. This new technology is poised to transform every industry and you need to be in front of this wave.",
            "link": "http://www.blocko2o.com"
          },
          {
            "date": "05-08-2018",
            "img": "img/calendar/ENQ.png",
            "title": "Enecuum ENQ - Blockchain of tomorrow!",
            "place": "Hong Kong, NakedHUB",
            "description": "We will share with you our innovative solutions of private chains, sharding, linear logic smart contracts built on Java Script for decentralized world. Join us on May, 8th, meet and mingle with Enecuum team and partners Alroid and Plasmabank to discuss the implementation of our revolutionary technology in business processes.\nProgram\n7:00 - 7:15 pm — Reception\n7:15 - 7:45 pm — ENQ presentation\n7:45 - 8:15 pm — Alroid & Plasmabank use cases\n8:15 - 8:30 pm — Q&A\n8:30 - 9:00 pm — Networking",
            "link": "https://www.eventbrite.com/e/welcome-of-blockchain-of-tomorrow-tickets-45583300880"
          },
          {
            "date": "05-08-2018",
            "img": "img/calendar/onoffmix.png",
            "title": "TrustVerse insight summit. Decentralized finance & AI",
            "place": "Seoul",
            "description": "TrustVerse’s Insights’ upcoming event in Seoul, Korea. Headwinds to Growth, don’t miss this rare opportunity to hear industry leaders in technology and finance to discuss about what stands in the way of blockchain, DLT and AI finance growth in 2018. We invite crypto enthusiasts, blockchain and AI technologist, academia and policy maker to get insights on the global spectrum of blockchain and AI business model, protocols, regulation and policy from speakers from Alibaba Group, Microsoft, Amazon Web Services, Cisco Systems, OECD and Hong Kong University of Science and Technology.",
            "link": "https://onoffmix.com/event/136795"
          },
          {
            "date": "05-14-2018 | 05-16-2018",
            "img": "img/calendar/cons.png",
            "title": "CONSENSUS 2018",
            "place": "New York Hilton Midtown",
            "description": "CoinDesk is proud to present our 4th annual blockchain technology summit, May 14-16, 2018 at the New York Hilton Midtown. Consensus 2018 will feature 250+ speakers and 4,000+ attendees from the leading industry startups, investors, financial institutions, enterprise tech leaders, and academic and policy groups who are building the foundations of the blockchain and digital currency economy.",
            "link": "https://www.coindesk.com/events/consensus-2018/"
          },
          {
            "date": "05-15-2018 | 05-18-2018",
            "img": "img/calendar/kros.png",
            "title": "RUSSIAN TELECOMMUNICATION OPERATORS CONFERENCE",
            "place": "Russia, Sochi",
            "description": "Conference of Russian Telecom Operators",
            "link": "https://cros.nag.ru/"
          },
          {
            "date": "05-17-2018 | 05-18-2018",
            "img": "img/calendar/cityblockchainsummit.jpg",
            "title": "CITYBLOCKCHAINSUMMIT",
            "place": "USA, NEW YORK",
            "description": "We are partisipating at the New York Blockchain Alternative Capital Summit as a speakers. The Summit will cover a wide array of topics including Blockchain, ICOs, investing, regulation, startups, Medical Marijuana, and much more. Industry speakers including Hedge Funds and Institutional Investors will be presenting throughout the two day conference with insightful discussions. We are planning to tell audience about innovations of ENQ platform.",
            "link": "https://cityblockchainsummit.com/"
          },
          {
            "date": "05-21-2018 | 05-25-2018",
            "img": "img/calendar/rbw.png",
            "title": "RUSSIAN BLOCKCHAIN WEEK 2018",
            "place": "Russia, Moscow, Skolkovo",
            "description": "5 days of diving into blockchain technologies sphere, receiving knowledge and communications, for which it usually takes years to get.",
            "link": "http://blockchainweek.moscow"
          },
          {
            "date": "05-28-2018 | 05-29-2018",
            "img": "img/calendar/block-show-white.png",
            "title": "BlockShow Europe",
            "place": "BERLIN, GERMANY",
            "description": "Just like that last time in Munich, the goal of BlockShow Europe 2018 stays the same: to bring together the global Blockchain community, as well as to demonstrate multiple new cases for implementation and enhancement of the Blockchain technology. Conference is designed to provide an exclusive look into exciting projects and initiatives, as well as to keep introducing Blockchain to the World. We are participating in BlockShow Oscar Startup Competition. The first stage of the Competition takes place at BlockShow Meetups by community voting. And we are the winners of Blockshow Zurich and we will represent at BlockShow Europe 2018 in Berlin on the second day — May 29. Come to support us!",
            "link": "https://blockshoweurope.com/blockshow-oscar/"
          }
        ]
      }
    },
    actions,
    mutations,
    getters
  })
};

export default createStore;
