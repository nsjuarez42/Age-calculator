const button = document.getElementById("calculate")

const day_in = document.getElementById("day")
const month_in = document.getElementById("month")
const year_in = document.getElementById("year")

button.addEventListener("click",()=>{
    const day = parseInt(day_in.value)
    const month = parseInt(month_in.value)
    const year = parseInt(year_in.value)
    
    let day_is_not_valid = isNaN(day) || day < 0 || day>31
    let month_is_not_valid =  isNaN(month) || month < 0 ||month > 12
    let year_is_not_valid = isNaN(year)  || year<1924 || year > new Date().getFullYear()

    if(day_is_not_valid || month_is_not_valid || year_is_not_valid){
        Swal.fire({
            icon: "error",
            title: "No es posible calcular la edad",
            text: "Los datos ingresados no son correctos",
            footer: '<a href="#">Why do I have this issue?</a>'
          });
    }else{
        const current_date = new Date()
        const curr_year = current_date.getFullYear()
        const curr_month = current_date.getMonth()+1
        const curr_day = current_date.getDate()

        //pass month index + 1 = regular month number
        const days_in_month = (y,m) => {return new Date(y,m,0).getDate()}

        let years,months,days;
        years = curr_month - month >=0 && curr_day >=day  ? curr_year-year  : curr_year-year -1        

        const calc_days = (day,curr_day)=>{
            if(day <= curr_day){
                days = curr_day -day
            }else{
                let days_past_month = days_in_month(curr_year,curr_month-1)
                days = 0;
                d = day
                while(d != curr_day){
                    if(d == days_past_month){
                        d = 1
                        days++
                    }else{
                        d++
                        days++
                    }
                }
            }
            return days
        }
        if(years == curr_year-year -1){
            months =0 
            let start_month = month
            while(start_month != curr_month){
                if(start_month == 12){
                    start_month =1
                    months++
                }else{
                    start_month++
                    months++
                }
            }
            months = day <= curr_day ? months : months-1
        }else{
            months = curr_month-month
        }    
        days= calc_days(day,curr_day)
        document.getElementById("result").innerHTML= `<span>Tienes ${years} año${years==1?"":"s"}, ${months} mes${months==1?"":"es"} y ${days} dia${days==1?"":"s"}</span>`

    }

})