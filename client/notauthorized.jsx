import React from "react";
import { render } from "react-dom";
import NotAuthorizedApp from "./components/NotAuthorizedApp.jsx";

import styles from "./scss/notauthorized.scss";

render(<NotAuthorizedApp />, document.getElementById("notAuthorizedRoot"));
