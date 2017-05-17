import React, {Component} from "react";

import * as d3 from "d3";

export default class extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tooltip: {display: false, data: {key: '', value: ''}},
            width: 0
        };
    }

    componentDidMount() {
        let data = [
            {
                "date": "24-Apr-07",
                "close": 93.24
            },
            {
                "date": "25-Apr-07",
                "close": 95.35
            },
            {
                "date": "26-Apr-07",
                "close": 98.84
            },
            {
                "date": "27-Apr-07",
                "close": 99.92
            },
            {
                "date": "30-Apr-07",
                "close": 99.8
            },
            {
                "date": "1-May-07",
                "close": 99.47
            },
            {
                "date": "2-May-07",
                "close": 100.39
            },
            {
                "date": "3-May-07",
                "close": 100.4
            },
            {
                "date": "4-May-07",
                "close": 100.81
            },
            {
                "date": "7-May-07",
                "close": 103.92
            },
            {
                "date": "8-May-07",
                "close": 105.06
            },
            {
                "date": "9-May-07",
                "close": 106.88
            },
            {
                "date": "10-May-07",
                "close": 107.34
            },
            {
                "date": "11-May-07",
                "close": 108.74
            },
            {
                "date": "14-May-07",
                "close": 109.36
            },
            {
                "date": "15-May-07",
                "close": 107.52
            },
            {
                "date": "16-May-07",
                "close": 107.34
            },
            {
                "date": "17-May-07",
                "close": 109.44
            },
            {
                "date": "18-May-07",
                "close": 110.02
            },
            {
                "date": "21-May-07",
                "close": 111.98
            },
            {
                "date": "22-May-07",
                "close": 113.54
            },
            {
                "date": "23-May-07",
                "close": 112.89
            },
            {
                "date": "24-May-07",
                "close": 110.69
            },
            {
                "date": "25-May-07",
                "close": 113.62
            },
            {
                "date": "29-May-07",
                "close": 114.35
            },
            {
                "date": "30-May-07",
                "close": 118.77
            },
            {
                "date": "31-May-07",
                "close": 121.19
            },
            {
                "date": "1-Jun-07",
                "close": 118.4
            },
            {
                "date": "4-Jun-07",
                "close": 121.33
            },
            {
                "date": "5-Jun-07",
                "close": 122.67
            },
            {
                "date": "6-Jun-07",
                "close": 123.64
            },
            {
                "date": "7-Jun-07",
                "close": 124.07
            },
            {
                "date": "8-Jun-07",
                "close": 124.49
            },
            {
                "date": "11-Jun-07",
                "close": 120.19
            },
            {
                "date": "12-Jun-07",
                "close": 120.38
            },
            {
                "date": "13-Jun-07",
                "close": 117.5
            },
            {
                "date": "14-Jun-07",
                "close": 118.75
            },
            {
                "date": "15-Jun-07",
                "close": 120.5
            },
            {
                "date": "18-Jun-07",
                "close": 125.09
            },
            {
                "date": "19-Jun-07",
                "close": 123.66
            },
            {
                "date": "20-Jun-07",
                "close": 121.55
            },
            {
                "date": "21-Jun-07",
                "close": 123.9
            },
            {
                "date": "22-Jun-07",
                "close": 123
            },
            {
                "date": "25-Jun-07",
                "close": 122.34
            },
            {
                "date": "26-Jun-07",
                "close": 119.65
            },
            {
                "date": "27-Jun-07",
                "close": 121.89
            },
            {
                "date": "28-Jun-07",
                "close": 120.56
            },
            {
                "date": "29-Jun-07",
                "close": 122.04
            },
            {
                "date": "2-Jul-07",
                "close": 121.26
            },
            {
                "date": "3-Jul-07",
                "close": 127.17
            },
            {
                "date": "5-Jul-07",
                "close": 132.75
            },
            {
                "date": "6-Jul-07",
                "close": 132.3
            },
            {
                "date": "9-Jul-07",
                "close": 130.33
            },
            {
                "date": "10-Jul-07",
                "close": 132.35
            },
            {
                "date": "11-Jul-07",
                "close": 132.39
            },
            {
                "date": "12-Jul-07",
                "close": 134.07
            },
            {
                "date": "13-Jul-07",
                "close": 137.73
            },
            {
                "date": "16-Jul-07",
                "close": 138.1
            },
            {
                "date": "17-Jul-07",
                "close": 138.91
            },
            {
                "date": "18-Jul-07",
                "close": 138.12
            },
            {
                "date": "19-Jul-07",
                "close": 140
            },
            {
                "date": "20-Jul-07",
                "close": 143.75
            },
            {
                "date": "23-Jul-07",
                "close": 143.7
            },
            {
                "date": "24-Jul-07",
                "close": 134.89
            },
            {
                "date": "25-Jul-07",
                "close": 137.26
            },
            {
                "date": "26-Jul-07",
                "close": 146
            },
            {
                "date": "27-Jul-07",
                "close": 143.85
            },
            {
                "date": "30-Jul-07",
                "close": 141.43
            },
            {
                "date": "31-Jul-07",
                "close": 131.76
            },
            {
                "date": "1-Aug-07",
                "close": 135
            },
            {
                "date": "2-Aug-07",
                "close": 136.49
            },
            {
                "date": "3-Aug-07",
                "close": 131.85
            },
            {
                "date": "6-Aug-07",
                "close": 135.25
            },
            {
                "date": "7-Aug-07",
                "close": 135.03
            },
            {
                "date": "8-Aug-07",
                "close": 134.01
            },
            {
                "date": "9-Aug-07",
                "close": 126.39
            },
            {
                "date": "10-Aug-07",
                "close": 125
            },
            {
                "date": "13-Aug-07",
                "close": 127.79
            },
            {
                "date": "14-Aug-07",
                "close": 124.03
            },
            {
                "date": "15-Aug-07",
                "close": 119.9
            },
            {
                "date": "16-Aug-07",
                "close": 117.05
            },
            {
                "date": "17-Aug-07",
                "close": 122.06
            },
            {
                "date": "20-Aug-07",
                "close": 122.22
            },
            {
                "date": "21-Aug-07",
                "close": 127.57
            },
            {
                "date": "22-Aug-07",
                "close": 132.51
            },
            {
                "date": "23-Aug-07",
                "close": 131.07
            },
            {
                "date": "24-Aug-07",
                "close": 135.3
            },
            {
                "date": "27-Aug-07",
                "close": 132.25
            },
            {
                "date": "28-Aug-07",
                "close": 126.82
            },
            {
                "date": "29-Aug-07",
                "close": 134.08
            },
            {
                "date": "30-Aug-07",
                "close": 136.25
            },
            {
                "date": "31-Aug-07",
                "close": 138.48
            },
            {
                "date": "4-Sep-07",
                "close": 144.16
            },
            {
                "date": "5-Sep-07",
                "close": 136.76
            },
            {
                "date": "6-Sep-07",
                "close": 135.01
            },
            {
                "date": "7-Sep-07",
                "close": 131.77
            },
            {
                "date": "10-Sep-07",
                "close": 136.71
            },
            {
                "date": "11-Sep-07",
                "close": 135.49
            },
            {
                "date": "12-Sep-07",
                "close": 136.85
            },
            {
                "date": "13-Sep-07",
                "close": 137.2
            },
            {
                "date": "14-Sep-07",
                "close": 138.81
            },
            {
                "date": "17-Sep-07",
                "close": 138.41
            },
            {
                "date": "18-Sep-07",
                "close": 140.92
            },
            {
                "date": "19-Sep-07",
                "close": 140.77
            },
            {
                "date": "20-Sep-07",
                "close": 140.31
            },
            {
                "date": "21-Sep-07",
                "close": 144.15
            },
            {
                "date": "24-Sep-07",
                "close": 148.28
            },
            {
                "date": "25-Sep-07",
                "close": 153.18
            },
            {
                "date": "26-Sep-07",
                "close": 152.77
            },
            {
                "date": "27-Sep-07",
                "close": 154.5
            },
            {
                "date": "28-Sep-07",
                "close": 153.47
            },
            {
                "date": "1-Oct-07",
                "close": 156.34
            },
            {
                "date": "2-Oct-07",
                "close": 158.45
            },
            {
                "date": "3-Oct-07",
                "close": 157.92
            },
            {
                "date": "4-Oct-07",
                "close": 156.24
            },
            {
                "date": "5-Oct-07",
                "close": 161.45
            },
            {
                "date": "8-Oct-07",
                "close": 167.91
            },
            {
                "date": "9-Oct-07",
                "close": 167.86
            },
            {
                "date": "10-Oct-07",
                "close": 166.79
            },
            {
                "date": "11-Oct-07",
                "close": 162.23
            },
            {
                "date": "12-Oct-07",
                "close": 167.25
            },
            {
                "date": "15-Oct-07",
                "close": 166.98
            },
            {
                "date": "16-Oct-07",
                "close": 169.58
            },
            {
                "date": "17-Oct-07",
                "close": 172.75
            },
            {
                "date": "18-Oct-07",
                "close": 173.5
            },
            {
                "date": "19-Oct-07",
                "close": 170.42
            },
            {
                "date": "22-Oct-07",
                "close": 174.36
            },
            {
                "date": "23-Oct-07",
                "close": 186.16
            },
            {
                "date": "24-Oct-07",
                "close": 185.93
            },
            {
                "date": "25-Oct-07",
                "close": 182.78
            },
            {
                "date": "26-Oct-07",
                "close": 184.7
            },
            {
                "date": "29-Oct-07",
                "close": 185.09
            },
            {
                "date": "30-Oct-07",
                "close": 187
            },
            {
                "date": "31-Oct-07",
                "close": 189.95
            },
            {
                "date": "1-Nov-07",
                "close": 187.44
            },
            {
                "date": "2-Nov-07",
                "close": 187.87
            },
            {
                "date": "5-Nov-07",
                "close": 186.18
            },
            {
                "date": "6-Nov-07",
                "close": 191.79
            },
            {
                "date": "7-Nov-07",
                "close": 186.3
            },
            {
                "date": "8-Nov-07",
                "close": 175.47
            },
            {
                "date": "9-Nov-07",
                "close": 165.37
            },
            {
                "date": "12-Nov-07",
                "close": 153.76
            },
            {
                "date": "13-Nov-07",
                "close": 169.96
            },
            {
                "date": "14-Nov-07",
                "close": 166.11
            },
            {
                "date": "15-Nov-07",
                "close": 164.3
            },
            {
                "date": "16-Nov-07",
                "close": 166.39
            },
            {
                "date": "19-Nov-07",
                "close": 163.95
            },
            {
                "date": "20-Nov-07",
                "close": 168.85
            },
            {
                "date": "21-Nov-07",
                "close": 168.46
            },
            {
                "date": "23-Nov-07",
                "close": 171.54
            },
            {
                "date": "26-Nov-07",
                "close": 172.54
            },
            {
                "date": "27-Nov-07",
                "close": 174.81
            },
            {
                "date": "28-Nov-07",
                "close": 180.22
            },
            {
                "date": "29-Nov-07",
                "close": 184.29
            },
            {
                "date": "30-Nov-07",
                "close": 182.22
            },
            {
                "date": "3-Dec-07",
                "close": 178.86
            },
            {
                "date": "4-Dec-07",
                "close": 179.81
            },
            {
                "date": "5-Dec-07",
                "close": 185.5
            },
            {
                "date": "6-Dec-07",
                "close": 189.95
            },
            {
                "date": "7-Dec-07",
                "close": 194.3
            },
            {
                "date": "10-Dec-07",
                "close": 194.21
            },
            {
                "date": "11-Dec-07",
                "close": 188.54
            },
            {
                "date": "12-Dec-07",
                "close": 190.86
            },
            {
                "date": "13-Dec-07",
                "close": 191.83
            },
            {
                "date": "14-Dec-07",
                "close": 190.39
            },
            {
                "date": "17-Dec-07",
                "close": 184.4
            },
            {
                "date": "18-Dec-07",
                "close": 182.98
            },
            {
                "date": "19-Dec-07",
                "close": 183.12
            },
            {
                "date": "20-Dec-07",
                "close": 187.21
            },
            {
                "date": "21-Dec-07",
                "close": 193.91
            },
            {
                "date": "24-Dec-07",
                "close": 198.8
            },
            {
                "date": "26-Dec-07",
                "close": 198.95
            },
            {
                "date": "27-Dec-07",
                "close": 198.57
            },
            {
                "date": "28-Dec-07",
                "close": 199.83
            },
            {
                "date": "31-Dec-07",
                "close": 198.08
            },
            {
                "date": "2-Jan-08",
                "close": 194.84
            },
            {
                "date": "3-Jan-08",
                "close": 194.93
            },
            {
                "date": "4-Jan-08",
                "close": 180.05
            },
            {
                "date": "7-Jan-08",
                "close": 177.64
            },
            {
                "date": "8-Jan-08",
                "close": 171.25
            },
            {
                "date": "9-Jan-08",
                "close": 179.4
            },
            {
                "date": "10-Jan-08",
                "close": 178.02
            },
            {
                "date": "11-Jan-08",
                "close": 172.69
            },
            {
                "date": "14-Jan-08",
                "close": 178.78
            },
            {
                "date": "15-Jan-08",
                "close": 169.04
            },
            {
                "date": "16-Jan-08",
                "close": 159.64
            },
            {
                "date": "17-Jan-08",
                "close": 160.89
            },
            {
                "date": "18-Jan-08",
                "close": 161.36
            },
            {
                "date": "22-Jan-08",
                "close": 155.64
            },
            {
                "date": "23-Jan-08",
                "close": 139.07
            },
            {
                "date": "24-Jan-08",
                "close": 135.6
            },
            {
                "date": "25-Jan-08",
                "close": 130.01
            },
            {
                "date": "28-Jan-08",
                "close": 130.01
            },
            {
                "date": "29-Jan-08",
                "close": 131.54
            },
            {
                "date": "30-Jan-08",
                "close": 132.18
            },
            {
                "date": "31-Jan-08",
                "close": 135.36
            },
            {
                "date": "1-Feb-08",
                "close": 133.75
            },
            {
                "date": "4-Feb-08",
                "close": 131.65
            },
            {
                "date": "5-Feb-08",
                "close": 129.36
            },
            {
                "date": "6-Feb-08",
                "close": 122
            },
            {
                "date": "7-Feb-08",
                "close": 121.24
            },
            {
                "date": "8-Feb-08",
                "close": 125.48
            },
            {
                "date": "11-Feb-08",
                "close": 129.45
            },
            {
                "date": "12-Feb-08",
                "close": 124.86
            },
            {
                "date": "13-Feb-08",
                "close": 129.4
            },
            {
                "date": "14-Feb-08",
                "close": 127.46
            },
            {
                "date": "15-Feb-08",
                "close": 124.63
            },
            {
                "date": "19-Feb-08",
                "close": 122.18
            },
            {
                "date": "20-Feb-08",
                "close": 123.82
            },
            {
                "date": "21-Feb-08",
                "close": 121.54
            },
            {
                "date": "22-Feb-08",
                "close": 119.46
            },
            {
                "date": "25-Feb-08",
                "close": 119.74
            },
            {
                "date": "26-Feb-08",
                "close": 119.15
            },
            {
                "date": "27-Feb-08",
                "close": 122.96
            },
            {
                "date": "28-Feb-08",
                "close": 129.91
            },
            {
                "date": "29-Feb-08",
                "close": 125.02
            },
            {
                "date": "3-Mar-08",
                "close": 121.73
            },
            {
                "date": "4-Mar-08",
                "close": 124.62
            },
            {
                "date": "5-Mar-08",
                "close": 124.49
            },
            {
                "date": "6-Mar-08",
                "close": 120.93
            },
            {
                "date": "7-Mar-08",
                "close": 122.25
            },
            {
                "date": "10-Mar-08",
                "close": 119.69
            },
            {
                "date": "11-Mar-08",
                "close": 127.35
            },
            {
                "date": "12-Mar-08",
                "close": 126.03
            },
            {
                "date": "13-Mar-08",
                "close": 127.94
            },
            {
                "date": "14-Mar-08",
                "close": 126.61
            },
            {
                "date": "17-Mar-08",
                "close": 126.73
            },
            {
                "date": "18-Mar-08",
                "close": 132.82
            },
            {
                "date": "19-Mar-08",
                "close": 129.67
            },
            {
                "date": "20-Mar-08",
                "close": 133.27
            },
            {
                "date": "24-Mar-08",
                "close": 139.53
            },
            {
                "date": "25-Mar-08",
                "close": 140.98
            },
            {
                "date": "26-Mar-08",
                "close": 145.06
            },
            {
                "date": "27-Mar-08",
                "close": 140.25
            },
            {
                "date": "28-Mar-08",
                "close": 143.01
            },
            {
                "date": "31-Mar-08",
                "close": 143.5
            },
            {
                "date": "1-Apr-08",
                "close": 149.53
            },
            {
                "date": "2-Apr-08",
                "close": 147.49
            },
            {
                "date": "3-Apr-08",
                "close": 151.61
            },
            {
                "date": "4-Apr-08",
                "close": 153.08
            },
            {
                "date": "7-Apr-08",
                "close": 155.89
            },
            {
                "date": "8-Apr-08",
                "close": 152.84
            },
            {
                "date": "9-Apr-08",
                "close": 151.44
            },
            {
                "date": "10-Apr-08",
                "close": 154.55
            },
            {
                "date": "11-Apr-08",
                "close": 147.14
            },
            {
                "date": "14-Apr-08",
                "close": 147.78
            },
            {
                "date": "15-Apr-08",
                "close": 148.38
            },
            {
                "date": "16-Apr-08",
                "close": 153.7
            },
            {
                "date": "17-Apr-08",
                "close": 154.49
            },
            {
                "date": "18-Apr-08",
                "close": 161.04
            },
            {
                "date": "21-Apr-08",
                "close": 168.16
            },
            {
                "date": "22-Apr-08",
                "close": 160.2
            },
            {
                "date": "23-Apr-08",
                "close": 162.89
            },
            {
                "date": "24-Apr-08",
                "close": 168.94
            },
            {
                "date": "25-Apr-08",
                "close": 169.73
            },
            {
                "date": "28-Apr-08",
                "close": 172.24
            },
            {
                "date": "29-Apr-08",
                "close": 175.05
            },
            {
                "date": "30-Apr-08",
                "close": 173.95
            },
            {
                "date": "1-May-08",
                "close": 180
            },
            {
                "date": "2-May-08",
                "close": 180.94
            },
            {
                "date": "5-May-08",
                "close": 184.73
            },
            {
                "date": "6-May-08",
                "close": 186.66
            },
            {
                "date": "7-May-08",
                "close": 182.59
            },
            {
                "date": "8-May-08",
                "close": 185.06
            },
            {
                "date": "9-May-08",
                "close": 183.45
            },
            {
                "date": "12-May-08",
                "close": 188.16
            },
            {
                "date": "13-May-08",
                "close": 189.96
            },
            {
                "date": "14-May-08",
                "close": 186.26
            },
            {
                "date": "15-May-08",
                "close": 189.73
            },
            {
                "date": "16-May-08",
                "close": 187.62
            },
            {
                "date": "19-May-08",
                "close": 183.6
            },
            {
                "date": "20-May-08",
                "close": 185.9
            },
            {
                "date": "21-May-08",
                "close": 178.19
            },
            {
                "date": "22-May-08",
                "close": 177.05
            },
            {
                "date": "23-May-08",
                "close": 181.17
            },
            {
                "date": "27-May-08",
                "close": 186.43
            },
            {
                "date": "28-May-08",
                "close": 187.01
            },
            {
                "date": "29-May-08",
                "close": 186.69
            },
            {
                "date": "30-May-08",
                "close": 188.75
            },
            {
                "date": "2-Jun-08",
                "close": 186.1
            },
            {
                "date": "3-Jun-08",
                "close": 185.37
            },
            {
                "date": "4-Jun-08",
                "close": 185.19
            },
            {
                "date": "5-Jun-08",
                "close": 189.43
            },
            {
                "date": "6-Jun-08",
                "close": 185.64
            },
            {
                "date": "9-Jun-08",
                "close": 181.61
            },
            {
                "date": "10-Jun-08",
                "close": 185.64
            },
            {
                "date": "11-Jun-08",
                "close": 180.81
            },
            {
                "date": "12-Jun-08",
                "close": 173.26
            },
            {
                "date": "13-Jun-08",
                "close": 172.37
            },
            {
                "date": "16-Jun-08",
                "close": 176.84
            },
            {
                "date": "17-Jun-08",
                "close": 181.43
            },
            {
                "date": "18-Jun-08",
                "close": 178.75
            },
            {
                "date": "19-Jun-08",
                "close": 180.9
            },
            {
                "date": "20-Jun-08",
                "close": 175.27
            },
            {
                "date": "23-Jun-08",
                "close": 173.16
            },
            {
                "date": "24-Jun-08",
                "close": 173.25
            },
            {
                "date": "25-Jun-08",
                "close": 177.39
            },
            {
                "date": "26-Jun-08",
                "close": 168.26
            },
            {
                "date": "27-Jun-08",
                "close": 170.09
            },
            {
                "date": "30-Jun-08",
                "close": 167.44
            },
            {
                "date": "1-Jul-08",
                "close": 174.68
            },
            {
                "date": "2-Jul-08",
                "close": 168.18
            },
            {
                "date": "3-Jul-08",
                "close": 170.12
            },
            {
                "date": "7-Jul-08",
                "close": 175.16
            },
            {
                "date": "8-Jul-08",
                "close": 179.55
            },
            {
                "date": "9-Jul-08",
                "close": 174.25
            },
            {
                "date": "10-Jul-08",
                "close": 176.63
            },
            {
                "date": "11-Jul-08",
                "close": 172.58
            },
            {
                "date": "14-Jul-08",
                "close": 173.88
            },
            {
                "date": "15-Jul-08",
                "close": 169.64
            },
            {
                "date": "16-Jul-08",
                "close": 172.81
            },
            {
                "date": "17-Jul-08",
                "close": 171.81
            },
            {
                "date": "18-Jul-08",
                "close": 165.15
            },
            {
                "date": "21-Jul-08",
                "close": 166.29
            },
            {
                "date": "22-Jul-08",
                "close": 162.02
            },
            {
                "date": "23-Jul-08",
                "close": 166.26
            },
            {
                "date": "24-Jul-08",
                "close": 159.03
            },
            {
                "date": "25-Jul-08",
                "close": 162.12
            },
            {
                "date": "28-Jul-08",
                "close": 154.4
            },
            {
                "date": "29-Jul-08",
                "close": 157.08
            },
            {
                "date": "30-Jul-08",
                "close": 159.88
            },
            {
                "date": "31-Jul-08",
                "close": 158.95
            },
            {
                "date": "1-Aug-08",
                "close": 156.66
            },
            {
                "date": "4-Aug-08",
                "close": 153.23
            },
            {
                "date": "5-Aug-08",
                "close": 160.64
            },
            {
                "date": "6-Aug-08",
                "close": 164.19
            },
            {
                "date": "7-Aug-08",
                "close": 163.57
            },
            {
                "date": "8-Aug-08",
                "close": 169.55
            },
            {
                "date": "11-Aug-08",
                "close": 173.56
            },
            {
                "date": "12-Aug-08",
                "close": 176.73
            },
            {
                "date": "13-Aug-08",
                "close": 179.3
            },
            {
                "date": "14-Aug-08",
                "close": 179.32
            },
            {
                "date": "15-Aug-08",
                "close": 175.74
            },
            {
                "date": "18-Aug-08",
                "close": 175.39
            },
            {
                "date": "19-Aug-08",
                "close": 173.53
            },
            {
                "date": "20-Aug-08",
                "close": 175.84
            },
            {
                "date": "21-Aug-08",
                "close": 174.29
            },
            {
                "date": "22-Aug-08",
                "close": 176.79
            },
            {
                "date": "25-Aug-08",
                "close": 172.55
            },
            {
                "date": "26-Aug-08",
                "close": 173.64
            },
            {
                "date": "27-Aug-08",
                "close": 174.67
            },
            {
                "date": "28-Aug-08",
                "close": 173.74
            },
            {
                "date": "29-Aug-08",
                "close": 169.53
            },
            {
                "date": "2-Sep-08",
                "close": 166.19
            },
            {
                "date": "3-Sep-08",
                "close": 166.96
            },
            {
                "date": "4-Sep-08",
                "close": 161.22
            },
            {
                "date": "5-Sep-08",
                "close": 160.18
            },
            {
                "date": "8-Sep-08",
                "close": 157.92
            },
            {
                "date": "9-Sep-08",
                "close": 151.68
            },
            {
                "date": "10-Sep-08",
                "close": 151.61
            },
            {
                "date": "11-Sep-08",
                "close": 152.65
            },
            {
                "date": "12-Sep-08",
                "close": 148.94
            },
            {
                "date": "15-Sep-08",
                "close": 140.36
            },
            {
                "date": "16-Sep-08",
                "close": 139.88
            },
            {
                "date": "17-Sep-08",
                "close": 127.83
            },
            {
                "date": "18-Sep-08",
                "close": 134.09
            },
            {
                "date": "19-Sep-08",
                "close": 140.91
            },
            {
                "date": "22-Sep-08",
                "close": 131.05
            },
            {
                "date": "23-Sep-08",
                "close": 126.84
            },
            {
                "date": "24-Sep-08",
                "close": 128.71
            },
            {
                "date": "25-Sep-08",
                "close": 131.93
            },
            {
                "date": "26-Sep-08",
                "close": 128.24
            },
            {
                "date": "29-Sep-08",
                "close": 105.26
            },
            {
                "date": "30-Sep-08",
                "close": 113.66
            },
            {
                "date": "1-Oct-08",
                "close": 109.12
            },
            {
                "date": "2-Oct-08",
                "close": 100.1
            },
            {
                "date": "3-Oct-08",
                "close": 97.07
            },
            {
                "date": "6-Oct-08",
                "close": 98.14
            },
            {
                "date": "7-Oct-08",
                "close": 89.16
            },
            {
                "date": "8-Oct-08",
                "close": 89.79
            },
            {
                "date": "9-Oct-08",
                "close": 88.74
            },
            {
                "date": "10-Oct-08",
                "close": 96.8
            },
            {
                "date": "13-Oct-08",
                "close": 110.26
            },
            {
                "date": "14-Oct-08",
                "close": 104.08
            },
            {
                "date": "15-Oct-08",
                "close": 97.95
            },
            {
                "date": "16-Oct-08",
                "close": 101.89
            },
            {
                "date": "17-Oct-08",
                "close": 97.4
            },
            {
                "date": "20-Oct-08",
                "close": 98.44
            },
            {
                "date": "21-Oct-08",
                "close": 91.49
            },
            {
                "date": "22-Oct-08",
                "close": 96.87
            },
            {
                "date": "23-Oct-08",
                "close": 98.23
            },
            {
                "date": "24-Oct-08",
                "close": 96.38
            },
            {
                "date": "27-Oct-08",
                "close": 92.09
            },
            {
                "date": "28-Oct-08",
                "close": 99.91
            },
            {
                "date": "29-Oct-08",
                "close": 104.55
            },
            {
                "date": "30-Oct-08",
                "close": 111.04
            },
            {
                "date": "31-Oct-08",
                "close": 107.59
            },
            {
                "date": "3-Nov-08",
                "close": 106.96
            },
            {
                "date": "4-Nov-08",
                "close": 110.99
            },
            {
                "date": "5-Nov-08",
                "close": 103.3
            },
            {
                "date": "6-Nov-08",
                "close": 99.1
            },
            {
                "date": "7-Nov-08",
                "close": 98.24
            },
            {
                "date": "10-Nov-08",
                "close": 95.88
            },
            {
                "date": "11-Nov-08",
                "close": 94.77
            },
            {
                "date": "12-Nov-08",
                "close": 90.12
            },
            {
                "date": "13-Nov-08",
                "close": 96.44
            },
            {
                "date": "14-Nov-08",
                "close": 90.24
            },
            {
                "date": "17-Nov-08",
                "close": 88.14
            },
            {
                "date": "18-Nov-08",
                "close": 89.91
            },
            {
                "date": "19-Nov-08",
                "close": 86.29
            },
            {
                "date": "20-Nov-08",
                "close": 80.49
            },
            {
                "date": "21-Nov-08",
                "close": 82.58
            },
            {
                "date": "24-Nov-08",
                "close": 92.95
            },
            {
                "date": "25-Nov-08",
                "close": 90.8
            },
            {
                "date": "26-Nov-08",
                "close": 95
            },
            {
                "date": "27-Nov-08",
                "close": 95
            },
            {
                "date": "28-Nov-08",
                "close": 92.67
            },
            {
                "date": "1-Dec-08",
                "close": 88.93
            },
            {
                "date": "2-Dec-08",
                "close": 92.47
            },
            {
                "date": "3-Dec-08",
                "close": 95.9
            },
            {
                "date": "4-Dec-08",
                "close": 91.41
            },
            {
                "date": "5-Dec-08",
                "close": 94
            },
            {
                "date": "8-Dec-08",
                "close": 99.72
            },
            {
                "date": "9-Dec-08",
                "close": 100.06
            },
            {
                "date": "10-Dec-08",
                "close": 98.21
            },
            {
                "date": "11-Dec-08",
                "close": 95
            },
            {
                "date": "12-Dec-08",
                "close": 98.27
            },
            {
                "date": "15-Dec-08",
                "close": 94.75
            },
            {
                "date": "16-Dec-08",
                "close": 95.43
            },
            {
                "date": "17-Dec-08",
                "close": 89.16
            },
            {
                "date": "18-Dec-08",
                "close": 89.43
            },
            {
                "date": "19-Dec-08",
                "close": 90
            },
            {
                "date": "22-Dec-08",
                "close": 85.74
            },
            {
                "date": "23-Dec-08",
                "close": 86.38
            },
            {
                "date": "24-Dec-08",
                "close": 85.04
            },
            {
                "date": "25-Dec-08",
                "close": 85.04
            },
            {
                "date": "26-Dec-08",
                "close": 85.81
            },
            {
                "date": "29-Dec-08",
                "close": 86.61
            },
            {
                "date": "30-Dec-08",
                "close": 86.29
            },
            {
                "date": "31-Dec-08",
                "close": 85.35
            },
            {
                "date": "1-Jan-09",
                "close": 85.35
            },
            {
                "date": "2-Jan-09",
                "close": 90.75
            },
            {
                "date": "5-Jan-09",
                "close": 94.58
            },
            {
                "date": "6-Jan-09",
                "close": 93.02
            },
            {
                "date": "7-Jan-09",
                "close": 91.01
            },
            {
                "date": "8-Jan-09",
                "close": 92.7
            },
            {
                "date": "9-Jan-09",
                "close": 90.58
            },
            {
                "date": "12-Jan-09",
                "close": 88.66
            },
            {
                "date": "13-Jan-09",
                "close": 87.71
            },
            {
                "date": "14-Jan-09",
                "close": 85.33
            },
            {
                "date": "15-Jan-09",
                "close": 83.38
            },
            {
                "date": "16-Jan-09",
                "close": 82.33
            },
            {
                "date": "20-Jan-09",
                "close": 78.2
            },
            {
                "date": "21-Jan-09",
                "close": 82.83
            },
            {
                "date": "22-Jan-09",
                "close": 88.36
            },
            {
                "date": "23-Jan-09",
                "close": 88.36
            },
            {
                "date": "26-Jan-09",
                "close": 89.64
            },
            {
                "date": "27-Jan-09",
                "close": 90.73
            },
            {
                "date": "28-Jan-09",
                "close": 94.2
            },
            {
                "date": "29-Jan-09",
                "close": 93
            },
            {
                "date": "30-Jan-09",
                "close": 90.13
            },
            {
                "date": "2-Feb-09",
                "close": 91.51
            },
            {
                "date": "3-Feb-09",
                "close": 92.98
            },
            {
                "date": "4-Feb-09",
                "close": 93.55
            },
            {
                "date": "5-Feb-09",
                "close": 96.46
            },
            {
                "date": "6-Feb-09",
                "close": 99.72
            },
            {
                "date": "9-Feb-09",
                "close": 102.51
            },
            {
                "date": "10-Feb-09",
                "close": 97.83
            },
            {
                "date": "11-Feb-09",
                "close": 96.82
            },
            {
                "date": "12-Feb-09",
                "close": 99.27
            },
            {
                "date": "13-Feb-09",
                "close": 99.16
            },
            {
                "date": "17-Feb-09",
                "close": 94.53
            },
            {
                "date": "18-Feb-09",
                "close": 94.37
            },
            {
                "date": "19-Feb-09",
                "close": 90.64
            },
            {
                "date": "20-Feb-09",
                "close": 91.2
            },
            {
                "date": "23-Feb-09",
                "close": 86.95
            },
            {
                "date": "24-Feb-09",
                "close": 90.25
            },
            {
                "date": "25-Feb-09",
                "close": 91.16
            },
            {
                "date": "26-Feb-09",
                "close": 89.19
            },
            {
                "date": "27-Feb-09",
                "close": 89.31
            },
            {
                "date": "2-Mar-09",
                "close": 87.94
            },
            {
                "date": "3-Mar-09",
                "close": 88.37
            },
            {
                "date": "4-Mar-09",
                "close": 91.17
            },
            {
                "date": "5-Mar-09",
                "close": 88.84
            },
            {
                "date": "6-Mar-09",
                "close": 85.3
            },
            {
                "date": "9-Mar-09",
                "close": 83.11
            },
            {
                "date": "10-Mar-09",
                "close": 88.63
            },
            {
                "date": "11-Mar-09",
                "close": 92.68
            },
            {
                "date": "12-Mar-09",
                "close": 96.35
            },
            {
                "date": "13-Mar-09",
                "close": 95.93
            },
            {
                "date": "16-Mar-09",
                "close": 95.42
            },
            {
                "date": "17-Mar-09",
                "close": 99.66
            },
            {
                "date": "18-Mar-09",
                "close": 101.52
            },
            {
                "date": "19-Mar-09",
                "close": 101.62
            },
            {
                "date": "20-Mar-09",
                "close": 101.59
            },
            {
                "date": "23-Mar-09",
                "close": 107.66
            },
            {
                "date": "24-Mar-09",
                "close": 106.5
            },
            {
                "date": "25-Mar-09",
                "close": 106.49
            },
            {
                "date": "26-Mar-09",
                "close": 109.87
            },
            {
                "date": "27-Mar-09",
                "close": 106.85
            },
            {
                "date": "30-Mar-09",
                "close": 104.49
            },
            {
                "date": "31-Mar-09",
                "close": 105.12
            },
            {
                "date": "1-Apr-09",
                "close": 108.69
            },
            {
                "date": "2-Apr-09",
                "close": 112.71
            },
            {
                "date": "3-Apr-09",
                "close": 115.99
            },
            {
                "date": "6-Apr-09",
                "close": 118.45
            },
            {
                "date": "7-Apr-09",
                "close": 115
            },
            {
                "date": "8-Apr-09",
                "close": 116.32
            },
            {
                "date": "9-Apr-09",
                "close": 119.57
            },
            {
                "date": "10-Apr-09",
                "close": 119.57
            },
            {
                "date": "13-Apr-09",
                "close": 120.22
            },
            {
                "date": "14-Apr-09",
                "close": 118.31
            },
            {
                "date": "15-Apr-09",
                "close": 117.64
            },
            {
                "date": "16-Apr-09",
                "close": 121.45
            },
            {
                "date": "17-Apr-09",
                "close": 123.42
            },
            {
                "date": "20-Apr-09",
                "close": 120.5
            },
            {
                "date": "21-Apr-09",
                "close": 121.76
            },
            {
                "date": "22-Apr-09",
                "close": 121.51
            },
            {
                "date": "23-Apr-09",
                "close": 125.4
            },
            {
                "date": "24-Apr-09",
                "close": 123.9
            },
            {
                "date": "27-Apr-09",
                "close": 124.73
            },
            {
                "date": "28-Apr-09",
                "close": 123.9
            },
            {
                "date": "29-Apr-09",
                "close": 125.14
            },
            {
                "date": "30-Apr-09",
                "close": 125.83
            },
            {
                "date": "1-May-09",
                "close": 127.24
            },
            {
                "date": "4-May-09",
                "close": 132.07
            },
            {
                "date": "5-May-09",
                "close": 132.71
            },
            {
                "date": "6-May-09",
                "close": 132.5
            },
            {
                "date": "7-May-09",
                "close": 129.06
            },
            {
                "date": "8-May-09",
                "close": 129.19
            },
            {
                "date": "11-May-09",
                "close": 129.57
            },
            {
                "date": "12-May-09",
                "close": 124.42
            },
            {
                "date": "13-May-09",
                "close": 119.49
            },
            {
                "date": "14-May-09",
                "close": 122.95
            },
            {
                "date": "15-May-09",
                "close": 122.42
            },
            {
                "date": "18-May-09",
                "close": 126.65
            },
            {
                "date": "19-May-09",
                "close": 127.45
            },
            {
                "date": "20-May-09",
                "close": 125.87
            },
            {
                "date": "21-May-09",
                "close": 124.18
            },
            {
                "date": "22-May-09",
                "close": 122.5
            },
            {
                "date": "26-May-09",
                "close": 130.78
            },
            {
                "date": "27-May-09",
                "close": 133.05
            },
            {
                "date": "28-May-09",
                "close": 135.07
            },
            {
                "date": "29-May-09",
                "close": 135.81
            },
            {
                "date": "1-Jun-09",
                "close": 139.35
            },
            {
                "date": "2-Jun-09",
                "close": 139.49
            },
            {
                "date": "3-Jun-09",
                "close": 140.95
            },
            {
                "date": "4-Jun-09",
                "close": 143.74
            },
            {
                "date": "5-Jun-09",
                "close": 144.67
            },
            {
                "date": "8-Jun-09",
                "close": 143.85
            },
            {
                "date": "9-Jun-09",
                "close": 142.72
            },
            {
                "date": "10-Jun-09",
                "close": 140.25
            },
            {
                "date": "11-Jun-09",
                "close": 139.95
            },
            {
                "date": "12-Jun-09",
                "close": 136.97
            },
            {
                "date": "15-Jun-09",
                "close": 136.09
            },
            {
                "date": "16-Jun-09",
                "close": 136.35
            },
            {
                "date": "17-Jun-09",
                "close": 135.58
            },
            {
                "date": "18-Jun-09",
                "close": 135.88
            },
            {
                "date": "19-Jun-09",
                "close": 139.48
            },
            {
                "date": "22-Jun-09",
                "close": 137.37
            },
            {
                "date": "23-Jun-09",
                "close": 134.01
            },
            {
                "date": "24-Jun-09",
                "close": 136.22
            },
            {
                "date": "25-Jun-09",
                "close": 139.86
            },
            {
                "date": "26-Jun-09",
                "close": 142.44
            },
            {
                "date": "29-Jun-09",
                "close": 141.97
            },
            {
                "date": "30-Jun-09",
                "close": 142.43
            },
            {
                "date": "1-Jul-09",
                "close": 142.83
            },
            {
                "date": "2-Jul-09",
                "close": 140.02
            },
            {
                "date": "3-Jul-09",
                "close": 140.02
            },
            {
                "date": "6-Jul-09",
                "close": 138.61
            },
            {
                "date": "7-Jul-09",
                "close": 135.4
            },
            {
                "date": "8-Jul-09",
                "close": 137.22
            },
            {
                "date": "9-Jul-09",
                "close": 136.36
            },
            {
                "date": "10-Jul-09",
                "close": 138.52
            },
            {
                "date": "13-Jul-09",
                "close": 142.34
            },
            {
                "date": "14-Jul-09",
                "close": 142.27
            },
            {
                "date": "15-Jul-09",
                "close": 146.88
            },
            {
                "date": "16-Jul-09",
                "close": 147.52
            },
            {
                "date": "17-Jul-09",
                "close": 151.75
            },
            {
                "date": "20-Jul-09",
                "close": 152.91
            },
            {
                "date": "21-Jul-09",
                "close": 151.51
            },
            {
                "date": "22-Jul-09",
                "close": 156.74
            },
            {
                "date": "23-Jul-09",
                "close": 157.82
            },
            {
                "date": "24-Jul-09",
                "close": 159.99
            },
            {
                "date": "27-Jul-09",
                "close": 160.1
            },
            {
                "date": "28-Jul-09",
                "close": 160
            },
            {
                "date": "29-Jul-09",
                "close": 160.03
            },
            {
                "date": "30-Jul-09",
                "close": 162.79
            },
            {
                "date": "31-Jul-09",
                "close": 163.39
            },
            {
                "date": "3-Aug-09",
                "close": 166.43
            },
            {
                "date": "4-Aug-09",
                "close": 165.55
            },
            {
                "date": "5-Aug-09",
                "close": 165.11
            },
            {
                "date": "6-Aug-09",
                "close": 163.91
            },
            {
                "date": "7-Aug-09",
                "close": 165.51
            },
            {
                "date": "10-Aug-09",
                "close": 164.72
            },
            {
                "date": "12-Aug-09",
                "close": 165.31
            },
            {
                "date": "13-Aug-09",
                "close": 168.42
            },
            {
                "date": "14-Aug-09",
                "close": 166.78
            },
            {
                "date": "17-Aug-09",
                "close": 159.59
            },
            {
                "date": "18-Aug-09",
                "close": 164
            },
            {
                "date": "19-Aug-09",
                "close": 164.6
            },
            {
                "date": "20-Aug-09",
                "close": 166.33
            },
            {
                "date": "21-Aug-09",
                "close": 169.22
            },
            {
                "date": "24-Aug-09",
                "close": 169.06
            },
            {
                "date": "25-Aug-09",
                "close": 169.4
            },
            {
                "date": "26-Aug-09",
                "close": 167.41
            },
            {
                "date": "27-Aug-09",
                "close": 169.45
            },
            {
                "date": "28-Aug-09",
                "close": 170.05
            },
            {
                "date": "31-Aug-09",
                "close": 168.21
            },
            {
                "date": "1-Sep-09",
                "close": 165.3
            },
            {
                "date": "2-Sep-09",
                "close": 165.18
            },
            {
                "date": "3-Sep-09",
                "close": 166.55
            },
            {
                "date": "4-Sep-09",
                "close": 170.31
            },
            {
                "date": "8-Sep-09",
                "close": 172.93
            },
            {
                "date": "9-Sep-09",
                "close": 171.14
            },
            {
                "date": "10-Sep-09",
                "close": 172.56
            },
            {
                "date": "11-Sep-09",
                "close": 172.16
            },
            {
                "date": "14-Sep-09",
                "close": 173.72
            },
            {
                "date": "15-Sep-09",
                "close": 175.16
            },
            {
                "date": "16-Sep-09",
                "close": 181.87
            },
            {
                "date": "17-Sep-09",
                "close": 184.55
            },
            {
                "date": "18-Sep-09",
                "close": 185.02
            },
            {
                "date": "21-Sep-09",
                "close": 184.02
            },
            {
                "date": "22-Sep-09",
                "close": 184.48
            },
            {
                "date": "23-Sep-09",
                "close": 185.5
            },
            {
                "date": "24-Sep-09",
                "close": 183.82
            },
            {
                "date": "25-Sep-09",
                "close": 182.37
            },
            {
                "date": "28-Sep-09",
                "close": 186.15
            },
            {
                "date": "29-Sep-09",
                "close": 185.38
            },
            {
                "date": "30-Sep-09",
                "close": 185.35
            },
            {
                "date": "1-Oct-09",
                "close": 180.86
            },
            {
                "date": "2-Oct-09",
                "close": 184.9
            },
            {
                "date": "5-Oct-09",
                "close": 186.02
            },
            {
                "date": "6-Oct-09",
                "close": 190.01
            },
            {
                "date": "7-Oct-09",
                "close": 190.25
            },
            {
                "date": "8-Oct-09",
                "close": 189.27
            },
            {
                "date": "9-Oct-09",
                "close": 190.47
            },
            {
                "date": "12-Oct-09",
                "close": 190.81
            },
            {
                "date": "13-Oct-09",
                "close": 190.02
            },
            {
                "date": "14-Oct-09",
                "close": 191.29
            },
            {
                "date": "15-Oct-09",
                "close": 190.56
            },
            {
                "date": "16-Oct-09",
                "close": 188.05
            },
            {
                "date": "19-Oct-09",
                "close": 189.86
            },
            {
                "date": "20-Oct-09",
                "close": 198.76
            },
            {
                "date": "21-Oct-09",
                "close": 204.92
            },
            {
                "date": "22-Oct-09",
                "close": 205.2
            },
            {
                "date": "23-Oct-09",
                "close": 203.94
            },
            {
                "date": "26-Oct-09",
                "close": 202.48
            },
            {
                "date": "27-Oct-09",
                "close": 197.37
            },
            {
                "date": "28-Oct-09",
                "close": 192.4
            },
            {
                "date": "29-Oct-09",
                "close": 196.35
            },
            {
                "date": "30-Oct-09",
                "close": 188.5
            },
            {
                "date": "2-Nov-09",
                "close": 189.31
            },
            {
                "date": "3-Nov-09",
                "close": 188.75
            },
            {
                "date": "4-Nov-09",
                "close": 190.81
            },
            {
                "date": "5-Nov-09",
                "close": 194.03
            },
            {
                "date": "6-Nov-09",
                "close": 194.34
            },
            {
                "date": "9-Nov-09",
                "close": 201.46
            },
            {
                "date": "10-Nov-09",
                "close": 202.98
            },
            {
                "date": "11-Nov-09",
                "close": 203.25
            },
            {
                "date": "12-Nov-09",
                "close": 201.99
            },
            {
                "date": "13-Nov-09",
                "close": 204.45
            },
            {
                "date": "16-Nov-09",
                "close": 206.63
            },
            {
                "date": "17-Nov-09",
                "close": 207
            },
            {
                "date": "18-Nov-09",
                "close": 205.96
            },
            {
                "date": "19-Nov-09",
                "close": 200.51
            },
            {
                "date": "20-Nov-09",
                "close": 199.92
            },
            {
                "date": "23-Nov-09",
                "close": 205.88
            },
            {
                "date": "24-Nov-09",
                "close": 204.44
            },
            {
                "date": "25-Nov-09",
                "close": 204.19
            },
            {
                "date": "26-Nov-09",
                "close": 204.19
            },
            {
                "date": "27-Nov-09",
                "close": 200.59
            },
            {
                "date": "30-Nov-09",
                "close": 199.91
            },
            {
                "date": "1-Dec-09",
                "close": 196.97
            },
            {
                "date": "2-Dec-09",
                "close": 196.23
            },
            {
                "date": "3-Dec-09",
                "close": 196.48
            },
            {
                "date": "4-Dec-09",
                "close": 193.32
            },
            {
                "date": "7-Dec-09",
                "close": 188.95
            },
            {
                "date": "8-Dec-09",
                "close": 189.87
            },
            {
                "date": "9-Dec-09",
                "close": 197.8
            },
            {
                "date": "10-Dec-09",
                "close": 196.43
            },
            {
                "date": "11-Dec-09",
                "close": 194.67
            },
            {
                "date": "14-Dec-09",
                "close": 196.98
            },
            {
                "date": "15-Dec-09",
                "close": 194.17
            },
            {
                "date": "16-Dec-09",
                "close": 195.03
            },
            {
                "date": "17-Dec-09",
                "close": 191.86
            },
            {
                "date": "18-Dec-09",
                "close": 195.43
            },
            {
                "date": "21-Dec-09",
                "close": 198.23
            },
            {
                "date": "22-Dec-09",
                "close": 200.36
            },
            {
                "date": "23-Dec-09",
                "close": 202.1
            },
            {
                "date": "24-Dec-09",
                "close": 209.04
            },
            {
                "date": "25-Dec-09",
                "close": 209.04
            },
            {
                "date": "28-Dec-09",
                "close": 211.61
            },
            {
                "date": "29-Dec-09",
                "close": 209.1
            },
            {
                "date": "30-Dec-09",
                "close": 211.64
            },
            {
                "date": "31-Dec-09",
                "close": 210.73
            },
            {
                "date": "1-Jan-10",
                "close": 210.73
            },
            {
                "date": "4-Jan-10",
                "close": 214.01
            },
            {
                "date": "5-Jan-10",
                "close": 214.38
            },
            {
                "date": "6-Jan-10",
                "close": 210.97
            },
            {
                "date": "7-Jan-10",
                "close": 210.58
            },
            {
                "date": "8-Jan-10",
                "close": 211.98
            },
            {
                "date": "11-Jan-10",
                "close": 210.11
            },
            {
                "date": "12-Jan-10",
                "close": 207.72
            },
            {
                "date": "13-Jan-10",
                "close": 210.65
            },
            {
                "date": "14-Jan-10",
                "close": 209.43
            },
            {
                "date": "15-Jan-10",
                "close": 205.93
            },
            {
                "date": "18-Jan-10",
                "close": 205.93
            },
            {
                "date": "19-Jan-10",
                "close": 215.04
            },
            {
                "date": "20-Jan-10",
                "close": 211.72
            },
            {
                "date": "21-Jan-10",
                "close": 208.07
            },
            {
                "date": "22-Jan-10",
                "close": 197.75
            },
            {
                "date": "25-Jan-10",
                "close": 203.08
            },
            {
                "date": "26-Jan-10",
                "close": 205.94
            },
            {
                "date": "27-Jan-10",
                "close": 207.88
            },
            {
                "date": "28-Jan-10",
                "close": 199.29
            },
            {
                "date": "29-Jan-10",
                "close": 192.06
            },
            {
                "date": "1-Feb-10",
                "close": 194.73
            },
            {
                "date": "2-Feb-10",
                "close": 195.86
            },
            {
                "date": "3-Feb-10",
                "close": 199.23
            },
            {
                "date": "4-Feb-10",
                "close": 192.05
            },
            {
                "date": "5-Feb-10",
                "close": 195.46
            },
            {
                "date": "8-Feb-10",
                "close": 194.12
            },
            {
                "date": "9-Feb-10",
                "close": 196.19
            },
            {
                "date": "10-Feb-10",
                "close": 195.12
            },
            {
                "date": "11-Feb-10",
                "close": 198.67
            },
            {
                "date": "12-Feb-10",
                "close": 200.38
            },
            {
                "date": "15-Feb-10",
                "close": 200.38
            },
            {
                "date": "16-Feb-10",
                "close": 203.4
            },
            {
                "date": "17-Feb-10",
                "close": 202.55
            },
            {
                "date": "18-Feb-10",
                "close": 202.93
            },
            {
                "date": "19-Feb-10",
                "close": 201.67
            },
            {
                "date": "22-Feb-10",
                "close": 200.42
            },
            {
                "date": "23-Feb-10",
                "close": 197.06
            },
            {
                "date": "24-Feb-10",
                "close": 200.66
            },
            {
                "date": "25-Feb-10",
                "close": 202
            },
            {
                "date": "26-Feb-10",
                "close": 204.62
            },
            {
                "date": "1-Mar-10",
                "close": 208.99
            },
            {
                "date": "2-Mar-10",
                "close": 208.85
            },
            {
                "date": "3-Mar-10",
                "close": 209.33
            }
        ];

        let parseTime = d3.timeParse("%d-%b-%y");
        data.forEach((datum) => {
            datum.date = parseTime(datum.date);
            datum.close = +datum.close;
        })

        let svg = d3.select(this.refs.historyGraph)
            .append('svg');

        svg.attr('height', '250')
            .attr('width', '400');

        let margin = {top: 20, right: 20, bottom: 30, left: 0},
            width = +svg.attr('width') - margin.left - margin.right,
            height = +svg.attr('height') - margin.top - margin.bottom,
            g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        let x = d3.scaleTime()
            .rangeRound([0, width]);

        let y = d3.scaleLinear()
            .rangeRound([height, 0]);

        let line = d3.line()
            .x(function (d) {
                return x(d.date);
            })
            .y(function (d) {
                return y(d.close);
            });

        x.domain(d3.extent(data, function (d) {
            return d.date;
        }));
        y.domain(d3.extent(data, function (d) {
            return d.close;
        }));

        g.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        g.append("g")
            .call(d3.axisLeft(y))
            .append("text")
            .attr("fill", "#000")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .text("Price ($)");

        g.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 1.5)
            .attr("d", line);
    }

    render() {
        let containerStyle = {
            marginTop: 5,
            height: 500
        };


        return (
            <div style={containerStyle} ref="historyGraph">
            </div>
        );
    }
}
