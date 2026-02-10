import { BrowserRouter as Router, Routes, Route } from "react-router";
import { ConfigProvider } from "antd";
import { Home, Success } from "./pages";
import { ROUTES_CONSTANTS } from "./types";

function App() {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "white",
                    borderRadius: 20,
                },
            }}
        >
            <Router>
                <Routes>
                    <Route path={ROUTES_CONSTANTS.HOME} element={<Home />} />
                    <Route
                        path={ROUTES_CONSTANTS.SUCCESS}
                        element={<Success />}
                    />
                </Routes>
            </Router>
        </ConfigProvider>
    );
}

export default App;
