
// setup(a) {
//     const { signer: t } = se();
//     let i = document.body.clientWidth;
//     const o = _(null)
//         , s = _(null)
//         , p = "0x3b484b82567a09e2588a13d54d032153f0c0aee0";
//     K(async () => { }
//     );
//     const n = P({
//         isJust: !1,
//         isCliam: !1,
//         isEligiable: !1,
//         loading: !1,
//         amountV: "",
//         r: "",
//         s: "",
//         dataObj: {
//             volume_eth: 0,
//             volume_dai: 0,
//             volume_usdc: 0,
//             volume_share: 0,
//             transactions: 0,
//             transactions_share: 0,
//             total_share: 0
//         }
//     });
//     function m(f) {
//         console.log(f, "****************"),
//             n.isJust = !0,
//             n.walletAddress = f;
//         let l = "https://sign.theopendao.com/" + f.toLowerCase();
//         at.get(l).then(r => {
//             console.log(r),
//                 n.isEligiable = !0,
//                 n.amountV = r.data.v,
//                 n.r = r.data.r,
//                 n.s = r.data.s,
//                 n.dataObj = r.data,
//                 h()
//         }
//         ).catch(r => {
//             n.isEligiable = !1,
//                 o.value.openError("Claim Error!!", "You are not eligible for the airdrop!", !1),
//                 n.amountV = "",
//                 n.r = "",
//                 n.s = "",
//                 n.dataObj = {
//                     volume_eth: 0,
//                     volume_dai: 0,
//                     volume_usdc: 0,
//                     volume_share: 0,
//                     transactions: 0,
//                     transactions_share: 0,
//                     total_share: 0
//                 }
//         }
//         )
//     }
//     async function h() {
//         const l = await new Oe(p, Le, t.value).minted(n.walletAddress);
//         return console.log(Number(l)),
//             Number(l) == 1 ? n.isCliam = !0 : n.isCliam = !1,
//             Number(l)
//     }
//     async function g() {
//         n.loading = !0;
//         let f = n.amountV
//             , l = n.r
//             , r = n.s;
//         const d = new Oe(p, Le, t.value);
//         n.isCliam == !0 ? (n.loading = !1,
//             o.value.openError("Claim Error!!", "You already minted!!", !1)) : await d.claim(f, l, r).then(() => {
//                 s.value.cliamSuccessful(n.walletAddress),
//                     n.isCliam = !0,
//                     n.loading = !1
//             }
//             ).catch(y => {
//                 n.loading = !1,
//                     o.value.openError("Claim Error!!", "Failed to claim because unknown error occurs!", !1)
//             }
//             )
//     }
//     function S() {
//         s.value.cliamSuccessful(n.walletAddress)
//     }
//     async function x() {
//         const f = "0x3b484b82567a09e2588a13d54d032153f0c0aee0"
//             , l = "SOS"
//             , r = 18
//             , d = "https://www.theopendao.com/img/token-1.png";
//         try {
//             const y = await ethereum.request({
//                 method: "wallet_watchAsset",
//                 params: {
//                     type: "ERC20",
//                     options: {
//                         address: f,
//                         symbol: l,
//                         decimals: r,
//                         image: d
//                     }
//                 }
//             }).then()
//         } catch (y) {
//             console.log(y)
//         }
//     }
//     return (f, l) => {
//         const r = C("n-space")
//             , d = C("n-spin");
//         return u(),
//             W(d, {
//                 show: c(n).loading
//             }, {
//                 default: U(() => [w(La, {
//                     ref: (y, A) => {
//                         A.errorRef = y,
//                             o.value = y
//                     }
//                 }, null, 512), w(ts, {
//                     ref: (y, A) => {
//                         A.claimRef = y,
//                             s.value = y
//                     }
//                 }, null, 512), e("div", t0, [a0, w(r, {
//                     class: "claim-content",
//                     justify: "center"
//                 }, {
//                     default: U(() => [e("div", s0, [e("div", null, [n0, c(i) > 767 ? (u(),
//                         v("div", i0, r0)) : (u(),
//                             v("div", d0, "CONNECT YOUR WALLET")), w(Re, {
//                                 onGetAddress: m
//                             }), u0, e("div", p0, [c(n).isEligiable && c(n).isJust ? (u(),
//                                 v("span", m0, "You are eligible for the airdrop!")) : !c(n).isEligiable && c(n).isJust ? (u(),
//                                     v("span", f0, "You are not eligible for the airdrop!")) : q("", !0)])])]), w(Ms, {
//                                         dataObj: c(n).dataObj
//                                     }, null, 8, ["dataObj"]), e("div", h0, [v0, e("div", b0, [c(i) > 767 ? (u(),
//                                         v("div", y0, w0)) : (u(),
//                                             v("div", k0, "INITIATE YOUR CLAIM")), e("div", S0, [c(n).isEligiable && !c(n).isCliam ? (u(),
//                                                 v("div", {
//                                                     key: 0,
//                                                     class: "button-format",
//                                                     onClick: g
//                                                 }, "Claim Airdrop")) : c(n).isEligiable && c(n).isCliam ? (u(),
//                                                     v("div", {
//                                                         key: 1,
//                                                         class: "button-format",
//                                                         onClick: S
//                                                     }, "Share")) : (u(),
//                                                         v("div", x0, "Claim Airdrop")), e("div", {
//                                                             class: "Add-token",
//                                                             onClick: x
//                                                         }, "Add $SOS")])])])]),
//                     _: 1
//                 })])]),
//                 _: 1
//             }, 8, ["show"])
//     }
// }
