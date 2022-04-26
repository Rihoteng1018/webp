$(document).ready(function(){
    $.ajax({
        url: 'https://ptx.transportdata.tw/MOTC/v2/Rail/Metro/ODFare/TYMC?%24top=30&%24format=JSON',
        type: "get",
		dataType:"json",
        success: function (info) {
				total_len = info.length;
                $("#orig").text("起始位置:"+ info[0].OriginStationName.Zh_tw+" "+info[0].OriginStationID);				
				for(i=0;i<total_len;i++){
					$("#row").append(
							"<tr>"+
							"<td>"+info[i].TravelTime+"分鐘"+"</td>"+
							"<td>"+"$ "+info[i].Fares[0].Price+"</td>"+
							"<td>"+info[i].DestinationStationName.Zh_tw+"</td>"+
                            "<td>"+info[i].DestinationStationID+"</td>"+
							"</tr>"
					)
				}							
        },
        error: function (data) {
            console.log("請求失敗");
        }
    });
});