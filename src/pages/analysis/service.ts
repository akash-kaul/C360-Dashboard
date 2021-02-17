import request from 'umi-request';

// export async function fakeChartData() {
//   request
//   .get('/api/fake_chart_data')
//     .then(function(response) {
//       console.log(response);
//       return response;
//     })
//     .catch(function(error) {
//       console.log(error);
//     });;
// }

export async function fakeChartData() {
  // console.log(request.get('/api/fake_chart_data'));
  return request.get('/api/fake_chart_data');
}
