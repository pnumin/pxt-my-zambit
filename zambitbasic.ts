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
    let ledsize = 5;


    //% block="zamText text = $text"  
    export function zamText(text: string) {

        for (let i = 0; i < text.length; i++) {
            let idx = hfont.indexOf(text.substr(i, 1))
            if (idx >= 0) {
                let dmatrix = disMatrix(hfont_matrix[idx]);
                dispalyLed(dmatrix);
            }

            basic.pause(1000)
            basic.clearScreen()
        }
    }

    //% block="zamTextScroll text = $text"  
    export function zamTextScroll(text: string) {
        for (let i = 0; i < text.length; i++) {
            let idx = hfont.indexOf(text.substr(i, 1))
            if (idx >= 0) {
                let dmatrix = disMatrix(hfont_matrix[idx]);

                for (let cnt = 1; cnt <= ledsize; cnt++) {
                    let dmatrix2 = disScrollMatrix(dmatrix, cnt);
                    dispalyLed(dmatrix2);
                    basic.pause(1000);
                    basic.clearScreen();
                }
            } 
        }

        
    }

    //display matrix
    //i : → , j : ↓
    function disMatrix(matrix: number[]) {
        let dmatrix = [[0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
        ];

        let i = 0;
        let j = 0;
        for (let idx = 0; idx < ledsize * ledsize; idx++) {
            dmatrix[i][j] = matrix[idx];
            i++;
            if (i % 5 == 0) {
                j++;
                i = 0;
            }
        }

        return dmatrix;
    }

    //display matrix
    function disScrollMatrix(matrix: number[][], x: number) {
        let dmatrix = [[0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
        ];

        let orignali = 0 ;
        for (let i = ledsize - x; i < ledsize   ; i++) {
            for (let j = 0; j < ledsize; j++) {
                dmatrix[i][j] = matrix[orignali][j];
            } 

            orignali++;
        }

        /** 
        let originali = 0; 
        for (let cnt = 1; cnt <= x; cnt++) {
            for (let i = ledsize - cnt; i >= ledsize -x ; i-- ) {
                for (let j = 0; j < ledsize; j++) {
                    dmatrix[i][j] = matrix[originali][j];
                }
                originali++;
            }
        } 
        */
        return dmatrix;
    }



    //led display 
    function dispalyLed(matrix: number[][]) {
        for (let i = 0; i < ledsize; i++) {
            for (let j = 0; j < ledsize; j++) {
                if (matrix[i][j] == 1) led.plot(i, j);
            }
        }
    }
}