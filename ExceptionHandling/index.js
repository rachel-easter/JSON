function calculateFare() {
            try {
                const numKms = parseFloat(document.getElementById('numKms').value);
                if (isNaN(numKms) || numKms <= 0) {
                    throw new Error('Please enter a valid number of kilometers.');//Error Message
                }

                const cabType = document.getElementById('cabType').value;
                let farePerKm;

                switch (cabType) {
                    case 'micro':
                        farePerKm = 10;
                        break;
                    case 'mini':
                        farePerKm = 15;
                        break;
                    case 'prime':
                        farePerKm = 25;
                        break;
                    default:
                        throw new Error('Invalid cab type selected.');
                }

                const discountCode = document.getElementById('discountCode').value;
                let discountMultiplier = 1;       //if any of the discount is applicable then it will give the result without any discount

                if (discountCode === 'FAST') {
                    discountMultiplier = 0.8; 
                }
              if(discountCode==='MEDIUM'){
                discountMultiplier=0.5;
              }
                const totalFare = numKms * farePerKm * discountMultiplier;

                document.getElementById('result').innerHTML = `Total Fare: Rs. ${totalFare.toFixed(2)}`;//It will display the result
            } catch (error) {
                document.getElementById('result').innerHTML = `Error: ${error.message}`;//If any error occur it will catch and show here....without any crash of the whole application 
            }
        }
