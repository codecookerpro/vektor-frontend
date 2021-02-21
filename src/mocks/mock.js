import AxiosMockAdapter from "axios-mock-adapter";
import axios from "services/axios";

const axiosMockAdapter = new AxiosMockAdapter(axios, {
  delayResponse: 0,
});

export default axiosMockAdapter;
