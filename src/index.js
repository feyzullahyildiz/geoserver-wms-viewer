import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import 'typeface-roboto'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
})
ReactDOM.render(<Provider store={store}>
    <MuiThemeProvider theme={theme}>
    {/* <MuiThemeProvider> */}
        <App />
    </MuiThemeProvider>
</Provider>, document.getElementById('root'));
