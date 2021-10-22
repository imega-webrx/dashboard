import MainApp from "./components/MainPage";
import { ThemeProvider, StyledEngineProvider, createTheme } from '@mui/material/styles';

const theme = createTheme()

function App() {
  return (
      <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
              <div className="App">
                <MainApp/>
              </div>
          </ThemeProvider>
      </StyledEngineProvider>
  );
}

export default App;
