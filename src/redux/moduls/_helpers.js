/**
 * @return string
 * */
export const routePathnameSelector = (state) => {
    if(!state.router.location.state || !state.router.location.state.from){
        return "/"
    }else{
        return state.router.location.state.from.pathname
    }
}
