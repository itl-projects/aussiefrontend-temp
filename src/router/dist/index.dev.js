"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _Home = _interopRequireDefault(require("@/views/Home.vue"));

var _Login = _interopRequireDefault(require("@/views/Login.vue"));

var _Owner = _interopRequireDefault(require("@/views/Owner"));

var _HostResult = _interopRequireDefault(require("@/views/HostResult"));

var _PerfectMatchHome = _interopRequireDefault(require("@/views/PerfectMatchHome"));

var _HostAccount = _interopRequireDefault(require("@/views/HostAccount"));

var _Dashboard = _interopRequireDefault(require("@/components/Host/Dashboard"));

var _Message = _interopRequireDefault(require("@/components/commons/Message"));

var _CanceledBookings = _interopRequireDefault(require("@/components/commons/CanceledBookings"));

var _Booking = _interopRequireDefault(require("@/components/commons/Booking"));

var _Photos = _interopRequireDefault(require("@/components/commons/Photos"));

var _Account = _interopRequireDefault(require("@/components/Owner/Account"));

var _Profile = _interopRequireDefault(require("@/components/Owner/Profile"));

var _Emergency = _interopRequireDefault(require("@/components/Owner/Emergency"));

var _Pet = _interopRequireDefault(require("@/components/Owner/Pet"));

var _Settings = _interopRequireDefault(require("@/components/Owner/Settings"));

var _Settings2 = _interopRequireDefault(require("@/components/Host/Settings"));

var _Profile2 = _interopRequireDefault(require("@/components/Host/Profile"));

var _Booking2 = _interopRequireDefault(require("@/components/Host/Booking"));

var _PageNotFound = _interopRequireDefault(require("@/views/PageNotFound"));

var _HostDetails = _interopRequireDefault(require("@/views/HostDetails"));

var _ShopHome = _interopRequireDefault(require("@/views/ShopHome"));

var _ShopTrending = _interopRequireDefault(require("@/components/Shop/ShopTrending"));

var _FilterPage = _interopRequireDefault(require("@/components/Shop/FilterPage"));

var _Contract = _interopRequireDefault(require("@/components/Owner/Contract"));

var _Contract2 = _interopRequireDefault(require("@/components/Host/Contract"));

var _Quiz = _interopRequireDefault(require("@/components/Host/Quiz"));

var _Wallet = _interopRequireDefault(require("@/components/Host/Wallet"));

var _DatingProfile = _interopRequireDefault(require("@/views/DatingProfile"));

var _DatingHome = _interopRequireDefault(require("@/views/DatingHome"));

var _PetCrush = _interopRequireDefault(require("@/views/PetCrush"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import PerfectMatch from "@/views/PerfectMatch";
// import MessageBox from "@/components/commons/MessageBox";
// import ShopPage from "@/views/Shop";
_vue["default"].use(_vueRouter["default"]);

var routes = [{
  path: "/",
  name: "Home",
  component: _Home["default"]
}, {
  path: "/login",
  name: "Login",
  component: _Login["default"]
}, {
  path: "/signup",
  name: "Signup",
  component: _Login["default"]
}, // {
//   path: "/hostsearch",
//   component: HostResult
// },
{
  path: "/hostsearch",
  component: _HostResult["default"],
  props: {
    city: true,
    service: true,
    start_date: false
  }
}, {
  path: "/perfect-match",
  name: "PerfectMatchHome",
  component: _PerfectMatchHome["default"]
}, {
  path: "/dating-profile",
  name: "DatingProfile",
  component: _DatingProfile["default"]
}, {
  path: "/dating-home",
  name: "DatingHome",
  component: _DatingHome["default"]
}, {
  path: "/petcrush",
  name: "PetCrush",
  component: _PetCrush["default"]
}, {
  path: "/hostdetail",
  name: "HostDetailPage",
  component: _HostDetails["default"],
  props: {
    city: true,
    service: true,
    query: true
  }
}, {
  path: "/shop",
  name: "ShopHome",
  component: _ShopHome["default"],
  children: [{
    path: "",
    component: _ShopTrending["default"]
  }, {
    path: "products",
    component: _FilterPage["default"]
  }]
}, // {
//   path: "profile-view",
//   name: "ProfileView",
//   component: ProfileView,
// },
{
  path: "/owner",
  component: _Owner["default"],
  children: [{
    path: "",
    component: _Account["default"]
  }, {
    path: "profile",
    component: _Profile["default"]
  }, {
    path: "emergency",
    component: _Emergency["default"]
  }, {
    path: "settings",
    component: _Settings["default"]
  }, {
    path: "pets",
    name: "pets",
    component: _Pet["default"]
  }, {
    path: "wallet",
    component: _Profile["default"]
  }, {
    path: "messages",
    component: _Message["default"]
  }, {
    path: "chat-messages",
    component: _Message["default"]
  }, {
    path: "photos",
    component: _Photos["default"]
  }, {
    path: "contracts",
    component: _Contract["default"]
  }, {
    path: "bookings",
    component: _Booking["default"]
  }]
}, {
  path: "/host",
  component: _HostAccount["default"],
  children: [{
    path: "",
    component: _Dashboard["default"]
  }, {
    path: "messages",
    component: _Message["default"]
  }, {
    path: "chat-messages",
    component: _Message["default"],
    props: {
      uname: true
    }
  }, {
    path: "photos",
    component: _Photos["default"]
  }, {
    path: "bookings",
    component: _Booking2["default"]
  }, {
    path: "canceled-bookings",
    component: _CanceledBookings["default"]
  }, {
    path: "contracts",
    component: _Contract2["default"]
  }, {
    path: "calendar",
    component: _Message["default"]
  }, {
    path: "settings",
    component: _Settings2["default"]
  }, {
    path: "profile",
    component: _Profile2["default"]
  }, {
    path: "quiz",
    component: _Quiz["default"]
  }, {
    path: "wallet",
    component: _Wallet["default"]
  }]
}, {
  path: "*",
  component: _PageNotFound["default"]
}];
var router = new _vueRouter["default"]({
  routes: routes,
  mode: "history"
});
var _default = router;
exports["default"] = _default;