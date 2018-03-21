<template>
    <div class="entrance">
        <el-container>
            <el-header>
                <Nav active-index="homepage" :inside-room="false"></Nav>
            </el-header>
            <el-main>

                <div class="center">
                    <el-card class="box-card">
                        <el-row>
                            <img src="../assets/pay.svg" width="40%">
                        </el-row>
                        <el-row>
                            <h2>
                                EasyAccount, easy travel with friends
                            </h2>
                        </el-row>
                        <div style="margin-bottom: 30px"></div>
                        <el-form ref="enterRoomForm">
                            <div class="login-window">
                                <div class="login-item">
                                    <el-row>
                                        <el-col>
                                            <el-input v-model="roomId" placeholder="Room id">

                                            </el-input>
                                        </el-col>
                                    </el-row>
                                </div>
                                <div class="login-item">
                                    <el-row>
                                        <el-col>
                                            <el-input type="password" v-model="password" placeholder="Password">
                                            </el-input>
                                        </el-col>
                                    </el-row>
                                </div>
                                <div class="login-item">
                                    <el-row>
                                        <el-col :span="24">
                                            <el-button type="success" @click="submitRoomId()"
                                                       style="box-shadow: 0 2px 12px 0 rgba(0,0,0,.1)">Enter In
                                            </el-button>
                                        </el-col>
                                    </el-row>
                                </div>
                                <div class="login-item">
                                    <el-row>
                                        <el-col>
                                            Want to create a new room?
                                            <router-link :to="{name:'Create'}"><el-button type="text">Create new room</el-button></router-link>
                                        </el-col>
                                    </el-row>
                                </div>
                            </div>
                        </el-form>
                    </el-card>
                </div>

                <!--div>Icons made by <a href="https://www.flaticon.com/authors/turkkub" title="turkkub">turkkub</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div-->
            </el-main>
        </el-container>

    </div>

</template>
<script>
    const utils = require('../utils/utils');
    const md5 = require('js-md5');
    import Nav from '@/components/Nav'; // import Nav
    export default{
        data(){
            return {
                roomId: '',
                password: ''
            }
        },
        components: {
            Nav
        },
        methods: {
            submitRoomId(){
                let checkRoomIdRequest = utils.getDbOperationTemplate(utils.SEARCH, 'room', {
                    document: {
                        id: this.roomId,
                        password: md5(this.password)
                    }
                });
                this.$http.post('/db', checkRoomIdRequest).then(res => {
                    let data = res.data;

                    if (data.length == 0) {
                        // no id is found
                        this.$message({
                            type: 'error', // info,success,warning,error
                            message: "Cannot find room " + this.roomId + " or the password is wrong. Please re-check."
                        });
                        //this.$ref['enterRoomForm'].resetFields(); // clear form
                        this.password = '';
                        this.roomId = '';

                    }
                    else if (data.length > 1) {
                        console.log('Internal error! The roomId is not unique !')
                    }
                    else {
                        let insertTokenToDB = utils.getDbOperationTemplate(utils.INSERT, 'auth', {
                            document: {
                                roomId: this.roomId
                                // token will be added on the server side
                            }
                        });
                        let getTokenRequest = {
                            roomId: this.roomId,
                            dbDocument: insertTokenToDB
                        };

                        this.$http.post('/api/get-token', getTokenRequest).then(res => {
                            let receivedData = res.data;
                            let accessToken = receivedData['accessToken'];
                            this.$cookies.set('access-token', accessToken, {expires: 1});
                            this.$cookies.set('roomId', this.roomId, {expires: 1});
                            this.$router.push({
                                name: 'HelloWorld',
                                params: this.wrapRoomInfo(data[0]),
                                query: {roomId: this.roomId}
                            });
                        });
                    }
                }).catch(error => {
                    console.log(error);
                })

            },
            wrapRoomInfo(roomInfo){
                return {
                    'roomId': roomInfo.id,
                    'people': roomInfo.people,
                    'roomCreateTime': roomInfo.createTime,
                    'currencyUnit': roomInfo.currencyUnit
                }

            }
        }
    }

</script>
<style>
    .center {
        margin: auto;
        width: 500px;
        text-align: center;
    }
    .login-item{
        margin: 22px 0;
    }
    @media (max-width: 768px) {
        .center {
            margin: auto;
            width: 320px;
            text-align: center;
        }
    }

</style>
