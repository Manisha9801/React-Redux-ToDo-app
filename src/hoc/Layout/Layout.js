import React ,{Component} from 'react';
import Aux from '../AuxComp';
import NavBar from './../../containers/NavBar/NavBar';

class Layout extends Component {
    render() {
        return(
            <Aux>
                <NavBar />
            </Aux>
        );
    }
}


export default Layout;