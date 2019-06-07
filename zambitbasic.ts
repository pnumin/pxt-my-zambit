// 여기에 코드를 추가하세요.
//% color=#222222 weight=110 icon="\uf121" block="zambitBasic"
//% groups="['others', 'Fruits', 'Veggies']"

namespace zambitBasic {
    //한글 정의 
    let hfont = ["가", "나", "다"]
    let hfont_matrix = [
        [1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0],
        [0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0],
        [1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0]
    ]


    //% block="zamText text = $text" group="한글"
    export function zamText(text: string) {

        for (let i = 0; i < text.length; i++) {
            let idx = hfont.indexOf(text.substr(i, 1))
            if (idx >= 0) {
                zamLedShow(idx);
            }

            basic.pause(1000)
            basic.clearScreen()
        }


    }

    //LED 
    function zamLedShow(x: number) {
        let row = 0;
        let col = 0;
        for (let i = 0; i < 25; i++) {
            if (hfont_matrix[x][i] == 1) led.plot(row, col);
            row++;
            if (row % 5 == 0) {
                col++;
                row = 0;
            }
        }
    }

    

}