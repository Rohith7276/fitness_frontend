 
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import { Bot } from "./components/bot.jsx";
createRoot(document.getElementById("root")).render( 
    <BrowserRouter>
     <Provider store={store}>
     <PersistGate persistor={persistor}>
      <div className="absolute bottom-0 h-fit w-[20vw]  right-0 z-[100]">

          <Bot />
      </div>
          <App />
    </PersistGate>
    </Provider>
    </BrowserRouter> 
);