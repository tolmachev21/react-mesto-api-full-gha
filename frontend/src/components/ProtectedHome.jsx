import Header from './Header.jsx'
import Main  from "./Main.jsx";

function ProtectedHome({userEmail, ...props}) {
    return (
        <>
        <Header dataUser={userEmail} />
        <Main
          {...props}
        />
      </>
    );
};

export default ProtectedHome;