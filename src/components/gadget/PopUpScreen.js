const PopUpScreen = (props) => { 
    return (
        <div className="BlackBackground">
            <div className="popUpWindow">
                {props.children}
            </div>
        </div>
    )
}
   
export default PopUpScreen;