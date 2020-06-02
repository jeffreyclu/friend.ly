import React from "react";
import { render } from "react-dom";
import SettingsContainer from "./components/SettingsContainer.jsx";

import styles from "./scss/settings.scss";

render(<SettingsContainer />, document.getElementById("settingsRoot"));
