import React from "react";
import { createRoot } from "react-dom/client";

import { I18nextProvider } from "react-i18next";
import i18n from "langs/i18n";

import "./assets/styles/global.css";

import App from "./container/App";

createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<I18nextProvider i18n={i18n}>
			<App />
		</I18nextProvider>
	</React.StrictMode>,
);
