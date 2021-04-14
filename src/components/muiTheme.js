import { createMuiTheme } from '@material-ui/core/styles';
import orange from '@material-ui/core/colors/orange';
import lightBlue from '@material-ui/core/colors/lightBlue';
import yellow from '@material-ui/core/colors/yellow';

const theme = createMuiTheme({
    palette: {
        primary: { main: orange[500] },
        secondary: {
        main: lightBlue[500],
        },
        custom: { 
        main: yellow[500]
        }
    },
});

export default theme