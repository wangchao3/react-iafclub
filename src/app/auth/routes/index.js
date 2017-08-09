import login from "./login";
import register from "./register"
import reset from "./reset"
import forgot from './forgot'
import identity from './identity'
import upload from './upload'
// import {unLoginRequired} from "../../common/services/authentication";

export default {
    path: "user",
    //onEnter : unLoginRequired,
    childRoutes: [
        login,
        register,
        reset,
        forgot,
        identity,
        upload
    ]
}
