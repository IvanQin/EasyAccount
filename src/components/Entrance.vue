<template>
    <div class="entrance">
        <el-container>
            <el-header>

            </el-header>
            <el-main>

                <div class="center">
                    <el-card class="box-card">
                        <el-row :gutter="20">
                            <el-col :span="8">
                                <el-input v-model="roomId" placeholder="Please enter room id.">

                                </el-input>
                            </el-col>
                            <el-col :span="8">
                                <el-input type="password" v-model="password" placeholder="Please enter password.">
                                </el-input>
                            </el-col>
                            <el-col :span="8">
                                <el-button type="success" @click="submitRoomId()">Confirm</el-button>
                            </el-col>
                        </el-row>

                    </el-card>
                </div>


            </el-main>
        </el-container>

    </div>
</template>
<script>
    const utils = require('../utils/utils');
    const md5 = require('js-md5');
    export default{
        data(){
            return {
                roomId: '',
                password: ''
            }
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
                        this.roomId = '';

                    }
                    else if (data.length > 1) {
                        console.log('Internal error! The roomId is not unique !')
                    }
                    else {
                        // TODO redirect, add access control!
                        // TODO Set cookie manually!
                        //this.$cookies.set('roomId',this.roomId);
                        this.$http.post('/api/get-token', {'roomId': this.roomId}).then(res => {
                            console.log(res);
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
        width: 600px;
    }

</style>