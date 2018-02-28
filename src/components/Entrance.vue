<template>
    <div class="entrance">
        <el-container>
            <el-header>

            </el-header>
            <el-main>
                <div class="center">

                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-input v-model="roomId" placeholder="Please enter room id.">

                            </el-input>
                        </el-col>
                        <el-col :span="8">
                            <el-button type="success" @click="submitRoomId()">Confirm</el-button>
                        </el-col>
                    </el-row>


                </div>

            </el-main>
        </el-container>

    </div>
</template>
<script>
    const utils = require('../utils/utils');
    export default{
        data(){
            return {
                roomId: ''
            }
        },
        methods: {
            submitRoomId(){
                let checkRoomIdRequest = utils.getDbOperationTemplate(2, 'room', {document: {id: this.roomId}});
                this.$http.post('/db', checkRoomIdRequest).then(res => {
                    let data = res.data;
                    if (data.length == 0) {
                        // no id is found
                        this.$message({
                            type: 'error', // info,success,warning,error
                            message: "Cannot find room " + this.roomId + " Please re-check."
                        });
                        this.roomId = '';
                    }
                    else if (data.length > 1) {
                        console.log('Internal error! The roomId is not unique !')
                    }
                    else {
                        // TODO redirect, add access control!
                        this.$router.push({
                            name: 'HelloWorld',
                            params: this.wrapRoomInfo(data[0]),
                            query: {roomId: this.roomId}
                        });
                    }
                })
                    .catch(error => {
                        console.log(error);
                    })

            },
            wrapRoomInfo(roomInfo){
                return {
                    'roomId': roomInfo.id,
                    'people': roomInfo.people,
                    'roomCreateTime': roomInfo.createTime
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