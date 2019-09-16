import { responseObj, errorResponse, userDataResponse, todoDataResponse } from "../../../types";

// NOTE Unit tests in "extra/commonService.spec.ts" for now
const responsifyData = (msg: string, data: userDataResponse | todoDataResponse): responseObj => (
  {
    msg,
    data
  }
)

const responsifyNoData = (msg: string): responseObj => ({
  msg
})

const responsifyError = (msg: string): errorResponse => ({
  msg
})

const CommonService = Object.assign({
  responsifyData,
  responsifyNoData,
  responsifyError
});
export default CommonService;