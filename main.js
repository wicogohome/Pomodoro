
var app = new Vue({
        el: '#app',
        data: {
            isWhite: false,
            message: 'Hello Vue!',
            countdown: '25:00',
            start_time: '',
            after_time: '',
            now: '',
            newTodo: '',
            todo_list: {
                today: [
                    {
                        name: 'First task today',
                        des: ["Lorem ipsum dolor sit amet.",
                            "Consectetur adipiscing elit.",
                            "Nulla vulputate neque",
                            "Consequat lorem pharetra",
                            "Ultrices non vitae elit.",],
                        useTime: 3,
                        isDone: true
                    }, {
                        name: 'Second task today',
                        des: ["2Lorem ipsum dolor sit amet.",
                            "Consectetur adipiscing elit.",
                            "Nulla vulputate neque",
                        ], useTime: 2,
                        isDone: false
                    }, {
                        name: 'Third task today',
                        des: ["2Lorem ipsum dolor sit amet.",
                            "Consectetur adipiscing elit.",
                            "Nulla vulputate neque",
                        ], useTime: 0,
                        isDone: false
                    }
                ],
            },
            current_task: 0,
            switch_button: false,
            t: '',


            musics: {
                white_noise: {
                    active: 1,
                    list: ['None',
                        'Air Conditioner Hum',
                        'Autumn Winds',
                        'Healing Storm',
                        'Rain on the River',
                        'Sleepy Beach Waves',]
                },

                alarm: {
                    active: 2,
                    list: ['None',
                        'Bell Sound Effect Ding',
                        'Cuckoo Bird Sound',
                        'Ding Ding Ding',
                        'Ding SFX',
                        'Noah Bells Melody',]
                }
            },
            isRest: false,
            navbar_switch: false,
        },
        mounted() {
            this.workClock(60);
            this.scale();
            this.analy();
        },
        methods: {
            //canvas
            scale: function () {
                //刻度
                var canvas = document.getElementById("scale");
                var ctx = canvas.getContext('2d');
                ctx.translate(0, 200);
                for (i = 0; i < 5; i++) {
                    ctx.save();
                    ctx.beginPath();
                    ctx.rotate((Math.PI / 180) * (i + 1) * 30);
                    ctx.moveTo(0, -146);
                    ctx.lineTo(0, -134);
                    ctx.strokeStyle = "#F5F1EE";
                    ctx.lineWidth = 4;
                    ctx.closePath();
                    ctx.stroke();
                    ctx.restore();
                }
                ctx.translate(0, 0);
            },
            analy: function () {
                var canvas = document.getElementById("ana");
                var ctx = canvas.getContext('2d');
                var arr = ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thr.', 'Fri.', 'Sat.'];
                //直線
                for (i = 0; i < 7; i++) {
                    ctx.save();
                    ctx.beginPath();

                    //日期
                    ctx.font = "10pt Arial";
                    ctx.fillStyle = '#003CA1';
                    ctx.fillText(arr[i], 34 + 320 / 6 * i, 215);
                    if (i === 2) {
                        ctx.arc(45 + 320 / 6 * i, 232, 15, 0, Math.PI * 2, true);
                        ctx.fillStyle = '#003CA1';
                        ctx.fill();
                        ctx.fillStyle = '#F5F1EE';
                    } else {
                        ctx.fillStyle = '#003CA1';
                    }
                    ctx.font = "15pt Avenir Next LT Pro";
                    ctx.fillText(i + 15, 32 + 320 / 6 * i, 240);

                    //線
                    ctx.translate(45 + 320 / 6 * i, 0);
                    ctx.moveTo(0, 0);
                    ctx.lineTo(0, 200);
                    ctx.strokeStyle = "#C9C8C7";
                    ctx.lineWidth = 0.5;
                    ctx.closePath();
                    ctx.stroke();
                    ctx.restore();
                }


                //橫線
                for (i = 0; i < 5; i++) {
                    ctx.save();
                    ctx.beginPath();
                    ctx.font = "12pt Arial";
                    ctx.fillStyle = '#003CA1';
                    ctx.fillText(5 - i, 10, 20 + 200 / 5 * i);
                    ctx.translate(30, 15 + 200 / 5 * i);
                    ctx.moveTo(0, 0);
                    ctx.lineTo(360, 0);
                    ctx.strokeStyle = "#C9C8C7";
                    ctx.lineWidth = 0.5;
                    ctx.closePath();
                    ctx.stroke();
                    ctx.restore();
                }

                //圖表
                var h_arr = [];
                ctx.save();
                ctx.beginPath();

                //圖表漸層
                for (i = 0; i < 7; i++) {
                    var height = 15 + 200 / 5 * Math.floor((Math.random() * 5));
                    h_arr.push(height);
                }
                ctx.moveTo(45, 200);
                h_arr.forEach(function (value, index) {
                    ctx.lineTo(45 + 320 / 6 * index, value);
                });
                ctx.lineTo(365, 200);
                ctx.lineTo(45, 200);

                var grd = ctx.createLinearGradient(0, 0, 0, 200);
                grd.addColorStop(0, "#5980C3");
                grd.addColorStop(0.7, "#afb7c3");
                grd.addColorStop(1, "rgba(0,0,0,0)");

                ctx.fillStyle = grd;
                ctx.closePath();
                ctx.fill();
                ctx.restore();

                //圖表上緣線
                ctx.save();
                ctx.beginPath();
                h_arr.forEach(function (value, index) {
                    ctx.lineTo(45 + 320 / 6 * index, value);
                });
                ctx.strokeStyle = "#2A56A5";
                ctx.lineWidth = 2;
                ctx.stroke();
                ctx.restore();

                //圖表圓點
                for (i = 0; i < 7; i++) {
                    ctx.save();
                    ctx.beginPath();
                    ctx.arc(45 + 320 / 6 * i, h_arr[i], 5, 0, Math.PI * 2, true);
                    ctx.fillStyle = '#F0ECE9';
                    ctx.strokeStyle = "#2A56A5";
                    ctx.lineWidth = 2;
                    ctx.closePath();
                    ctx.fill();
                    ctx.stroke();
                    ctx.restore();
                }

            },
            workClock: function (minArc) {
                //指針區塊
                var canvas = document.getElementById("clock");
                var ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, 500, 500);
                ctx.save();
                ctx.beginPath();
                ctx.moveTo(0, 200);
                ctx.lineTo(0, 370);
                ctx.arc(0, 200, 170, (Math.PI / 180) * 90, (Math.PI / 180) * (minArc), true);
                ctx.lineTo(0, 200);
                ctx.strokeStyle = "#003CA1";
                ctx.fillStyle = "rgba(240, 236, 233,0.7)";
                ctx.lineWidth = 2;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 10;
                ctx.shadowBlur = 6;
                ctx.shadowColor = "rgba(0, 0, 0, 0.16)";
                ctx.closePath();
                ctx.stroke();
                ctx.fill();
                ctx.restore();

            },

            //計時按鈕
            timing: function () {
                var setMin = this.isRest ? 5 : 25;
                this.switch_button = !this.switch_button;
                if (this.switch_button && this.start_time === '' && this.after_time === '') {
                    //剛開始
                    this.start_time = new Date();
                    this.after_time = new Date();
                    this.after_time.setMinutes(this.start_time.getMinutes() + setMin);
                    this.t = setTimeout(() => {
                        this.countDownTime();
                    }, 10);
                } else if (this.switch_button && this.start_time !== '' && this.after_time !== '') {
                    //暫停重啟
                    var min = this.countdown.substr(0, 2);
                    var sec = this.countdown.substr(-2);
                    var restart_now = new Date();

                    var serMin = restart_now.getMinutes() + Number(min);
                    if(!this.isRest){
                        serMin = serMin>= 60 ? serMin-60:serMin;
                    }

                    this.after_time.setMinutes(serMin);
                    this.after_time.setSeconds(restart_now.getSeconds() + Number(sec));

                    this.t = setTimeout(() => {
                        this.countDownTime();
                    }, 10);
                }

            },

            //計時細節
            countDownTime: function () {
                this.now = new Date();
                var range = this.after_time - this.now;
                var sec = range % (60 * 1000);
                if (sec.toString().length > 3) {
                    sec = sec.toString().length > 4 ? sec.toString().substr(0, 2) : sec.toString().substr(0, 1);
                    sec = '0' + sec;
                } else {
                    sec = '00';
                }
                var min = '0' + Math.floor(range / (60 * 1000));
                this.countdown = min.substr(-2) + ':' + sec.substr(-2);

                //指針動畫
                var arc = this.isRest ? 2 : 10;
                var isCounterclockwise = !this.isRest;
                var minArc = (range / 1000) / arc;
                minArc = this.isRest ? 60 - minArc : minArc - 90;
                this.workClock(minArc);

                //迴圈跑起來
                if (this.countdown !== '00:00' && this.switch_button) {
                    this.t = setTimeout(() => {
                        this.countDownTime();
                    }, 10);
                } else if (this.countdown === '00:00') {
                    if (!this.isRest) {
                        this.isRest = true;
                        this.reset();
                        this.todo_list.today[this.current_task].useTime++;
                        this.todo_list.today[this.current_task].isDone = true;
                        this.switch_button = true;
                        this.timing();
                    } else {
                        this.isRest = false;
                        this.reset();
                    }
                }


            },

            reset: function () {
                var min = this.isRest ? '05' : '25';
                clearTimeout(this.t);
                this.countdown = min + ':00';
                this.start_time = '';
                this.after_time = '';
                this.now = '';
                this.switch_button = false;
                this.workClock(this.isRest ? -90 : 60);
            },
            skip: function () {
                this.reset();
                return this.isRest ? this.todo_list.today[this.current_task].useTime++ : null;
            },

            //navbar功能
            checkActive: function () {
                $('a.active').removeClass('active');
            },
            addTask: function () {
                this.todo_list.today.push({
                    name: this.newTodo,
                    des: ['skip'],
                    useTime: 0,
                    isDone: false
                });
                this.newTodo = '';
            },

        },
    });
