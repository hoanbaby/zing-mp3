import React, { memo, useMemo, useEffect, useLayoutEffect } from "react"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useDispatch } from "react-redux"
import { setPlaying } from "./features/SettingPlay/settingPlay"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./firebase/firebase-config"
import { setUser } from "./features/User/userFeatures"

function App() {
   const theme = useSelector((state) => state.themetoggle)
   const queueNowPlaySelector = useSelector((state) => state.queueNowPlay)
   const loggedSelector = useSelector((state) => state.logged)
   const settingSelector = useSelector((state) => state.setting)
   const lyricsSelector = useSelector((state) => state.lyrics)
   const timeSelector = useSelector((state) => state.currentTimes)
   const usersSelcetor = useSelector((state) => state.users)

   const dispatch = useDispatch()

   useLayoutEffect(() => {
      onAuthStateChanged(auth, (user) => {
         if (!usersSelcetor.activeUser && user) {
            dispatch(
               setUser({
                  displayName: user.displayName,
                  photoURL: user.photoURL,
                  email: user.email,
                  uid: user.uid,
               })
            )
         }
      })
   }, [])

   useEffect(() => {
      const keyboardShortcuts = (e) => {
         let input = document.querySelectorAll("input")

         let data = e.keyCode

         let isInput = false
         input.forEach((e) => {
            if (e === document.activeElement) {
               isInput = true
            }
         })
         if (isInput) return
         // eslint-disable-next-line default-case
         switch (data) {
            case 32:
               e.preventDefault()
               dispatch(setPlaying())
               break
            case 39:
               document.querySelector("#nextMusic").click()
               break
            case 37:
               document.querySelector("#prevMusic").click()
               break
            case 74:
               document.querySelector("#randomMusic").click()
               break
            case 76:
               document.querySelector("#loopMusic").click()
               break
         }
      }
      document.addEventListener("keydown", keyboardShortcuts)

      return () => document.removeEventListener("keydown", keyboardShortcuts)
   }, [])

   useMemo(() => {
      document.documentElement.setAttribute("data-theme", theme.dataTheme)
      if (theme.bgImg) {
         document.documentElement.classList.add("theme-bg-image")
      } else {
         document.documentElement.classList.remove("theme-bg-image")
      }

      if (theme.bgPlaying) {
         document.documentElement.classList.add("zma")
      } else {
         document.documentElement.classList.remove("zma")
      }

      if (theme.dataStyle) {
         const param = theme.dataStyle.map((e) => {
            return e
         })
         document.documentElement.setAttribute("style", param.join(" ; "))
      } else {
         document.documentElement.removeAttribute("style")
      }
   }, [])

   // set localStorage
   useMemo(() => {
      const queueNowPlay = JSON.parse(localStorage.getItem("queue_nowplay"))
      const logged = JSON.parse(localStorage.getItem("d4tmp3_logged"))
      const setting = JSON.parse(localStorage.getItem("d4tmp3_setting"))
      const lyrics = JSON.parse(localStorage.getItem("d4tmp3_lyrics"))
      const time = JSON.parse(localStorage.getItem("d4tmp3_timeCurrent"))

      if (!queueNowPlay) {
         localStorage.setItem("queue_nowplay", JSON.stringify(queueNowPlaySelector))
      }
      if (!logged) {
         localStorage.setItem("d4tmp3_logged", JSON.stringify(loggedSelector))
      }
      if (!setting) {
         localStorage.setItem("d4tmp3_setting", JSON.stringify(settingSelector))
      }
      if (!lyrics) {
         localStorage.setItem("d4tmp3_lyrics", JSON.stringify(lyricsSelector))
      }
      if (!time) {
         localStorage.setItem("d4tmp3_timeCurrent", JSON.stringify(timeSelector))
      }
   }, [])

   useEffect(() => {
      window.addEventListener("load", () => {
         document.querySelector(".loadings")?.remove()
      })
   }, [])

   return (
      <>
         <div className="loadings">
            <div className="loader">
               <div className="bar1"></div>
               <div className="bar2"></div>
               <div className="bar3"></div>
               <div className="bar4"></div>
               <div className="bar5"></div>
               <div className="bar6"></div>
            </div>
         </div>

         <div
            className={`main ${queueNowPlaySelector.currentEncodeId ? "" : "hide-bottom"}`}
            style={theme.bgImg ? { backgroundImage: `url('${theme.bgImg}')` } : {}}
         >
            <Header></Header>
            <Siderleft></Siderleft>
            <BottomPlay></BottomPlay>
            <RouterPage></RouterPage>
            <ToastContainer
               position="top-center"
               autoClose={3000}
               hideProgressBar={false}
               newestOnTop={false}
               closeOnClick
               rtl={false}
               pauseOnFocusLoss
               draggable
               pauseOnHover
               limit={5}
            ></ToastContainer>
         </div>
      </>
   )
}

export default memo(App)

