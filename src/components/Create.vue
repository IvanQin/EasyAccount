<template>
    <div class="create">
        <el-container>
            <el-header>
                <Nav active-index="create" :inside-room="false"></Nav>
            </el-header>
            <el-main>
                <div class="center-form">
                    <el-card>
                        <el-form :model="addRoomTemplate" ref="addRoomForm" :rules="addRoomTemplateRules"
                                 status-icon>
                            <el-form-item label="Room Id" :label-width="labelWidth" prop="roomId">
                                <el-input v-model="addRoomTemplate.roomId" placeholder="Room id"></el-input>
                            </el-form-item>
                            <el-form-item label="Password" :label-width="labelWidth" prop="password">
                                <el-input type="password" v-model="addRoomTemplate.password" placeholder="Password">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="Confirm Pass" :label-width="labelWidth" prop="checkPassword">
                                <el-input type="password" v-model="addRoomTemplate.checkPassword"
                                          placeholder="Password again">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="Currency Unit" :label-width="labelWidth" prop="currencyUnit">
                                <el-select v-model="addRoomTemplate.currencyUnit" placeholder="choose currency unit">
                                    <el-option
                                            v-for="p in currencyUnitMap"
                                            :key="p.id"
                                            :label="p[0]"
                                            :value="p[0]">
                                        <span style="float: left">{{p[0]}}</span>
                                        <span style="float: right">{{p[2]}}</span>
                                    </el-option>
                                </el-select>

                            </el-form-item>
                            <el-form-item label="People" :label-width="labelWidth" prop="people">
                                <el-select
                                        v-model="addRoomTemplate.involvedPeople"
                                        multiple
                                        filterable
                                        allow-create
                                        default-first-option
                                        placeholder="Add travelers">
                                    <el-option
                                            v-for="p in people"
                                            :key="p.id"
                                            :label="p"
                                            :value="p">
                                    </el-option>
                                </el-select>
                            </el-form-item>

                        </el-form>
                        <div style="margin-bottom: 50px"></div>
                        <el-row>
                            <!--el-col :span="8" :offset="4">
                                <el-button type="warning" @click="resetRoomForm">Reset</el-button>
                            </el-col-->
                            <el-col :span="24" style="text-align: center;">
                                <el-button type="success" @click="submitRoomForm('addRoomForm')">Submit</el-button>
                            </el-col>
                        </el-row>

                    </el-card>
                </div>
            </el-main>
        </el-container>
    </div>
</template>
<script>
    import Nav from '@/components/Nav'
    const emoji = require('node-emoji');
    const utils = require('../utils/utils');
    const md5 = require('js-md5');
    const currencyUnitMap = [
        ['USD', '$', emoji.get('flag-us')],
        ['CNY', '¥', emoji.get('flag-cn')],
        ['EUR', '€', emoji.get('flag-eu')],
        ['GBP', '￡', emoji.get('flag-gb')]
    ];
    export default{
        name: 'Create',
        components: {
            Nav
        },
        data(){
//            var checkAge = (rule, value, callback) => {
//                console.log(value);
//                if (!value) {
//                    return callback(new Error('年龄不能为空'));
//                }
//                setTimeout(() => {
//                    if (!Number.isInteger(value)) {
//                        callback(new Error('请输入数字值'));
//                    } else {
//                        if (value < 18) {
//                            callback(new Error('必须年满18岁'));
//                        } else {
//                            callback();
//                        }
//                    }
//                }, 1000);
//            };
            let roomIdValidator = (rule, value, callback) => {
                if (value == ''){
                    callback(new Error('Room id cannot be empty.'))
                }
                this.checkRoomIdUnique(value).then(resolve => {
                    callback();
                }, rej => {
                    callback(new Error(rej));
                });
            };
            let passwordValidator = (rule,value,callback)=>{
                if (value == ''){
                    callback(new Error("Password cannot be empty!"));
                }
                else{
                    callback();
                }
            };
            let checkPassValidator = (rule, value, callback) => {
                if (this.addRoomTemplate.password == ''){
                    callback(new Error("Please enter password first."))
                }
                else if (value != this.addRoomTemplate.password) {
                    callback(new Error("Different passwords. Please re-check."))
                }
                else {
                    callback();
                }
            };

            return {
                currencyUnitMap: currencyUnitMap,
                people: ['Default'],
                addRoomTemplate: {
                    roomId: '',
                    password: '',
                    checkPassword: '',
                    currencyUnit: '',
                    involvedPeople: []
                },
                addRoomTemplateRules: {
                    roomId: [{validator: roomIdValidator, trigger: 'blur'}],
                    password:[{validator: passwordValidator, trigger:'blur'}],
                    checkPassword: [{validator: checkPassValidator, trigger: 'blur'}]
                },
                labelWidth: '120px'

            }
        },
        methods: {

            refreshAddRoomTemplate(){
                this.addRoomTemplate = {
                    roomId: '',
                    password: '',
                    checkPassword: '',
                    currencyUnit: '',
                    involvedPeople: []
                }
            },
            wrapRoomRequest(){
                return {
                    currencyUnit: this.addRoomTemplate.currencyUnit,
                    people: this.addRoomTemplate.involvedPeople,
                    id: this.addRoomTemplate.roomId,
                    password: md5(this.addRoomTemplate.password)
                }
            },
            resetRoomForm(formName){
                this.$refs[formName].resetFields();
                this.refreshAddRoomTemplate();
            },
            submitRoomForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let wrappedRoomRequest = this.wrapRoomRequest(this.addRoomTemplate);
                        let addRoomRequest = utils.getDbOperationTemplate(utils.INSERT, 'room', {
                            document: wrappedRoomRequest
                        });
                        console.log(addRoomRequest);
                        this.$http.post('/db', addRoomRequest).then(res => {
                            let receivedData = res.data;
                            if (receivedData == utils.SUCCESS_MSG) {
                                this.$message.success("Success adding room : " + this.addRoomTemplate.roomId);
                                this.resetRoomForm('addRoomForm');
                            }
                            else {
                                this.$message.error("Cannot add room : " + this.addRoomTemplate.roomId);
                            }
                        }).catch(err => console.log(err));
                    }
                    else{
                        this.$message.error("The form is invalid!");
                    }
                });

            },
            checkRoomIdUnique(roomId){
                let searchRoomIdRequest = utils.getDbOperationTemplate(utils.SEARCH, 'room', {
                    document: {
                        id: roomId
                    }
                });
                return new Promise((resolve, reject) => {
                    this.$http.post('/db', searchRoomIdRequest).then(res => {
                        let receivedData = res.data;
                        if (receivedData.length == 0) {
                            resolve(utils.SUCCESS_MSG);
                        }
                        else {
                            reject("Room id must be unique. Please change.");
                        }
                    }).catch(err => {
                        reject(err);
                    })
                })

            }
        }
    }
</script>
<style scoped>
    .center-form {
        margin: auto;
        width: 500px;
    }

    @media (max-width: 768px) {
        .center-form {
            margin: auto;
            width: 320px;
        }
    }

</style>
