<template>
    <div class="hello">
        <el-container>
            <el-header>Header</el-header>
            <el-container>
                <el-aside>
                    <div style="height: 600px;margin: auto;padding: 10px 50px">
                        <el-steps direction="vertical" :active="1">
                            <el-step title="步骤 1"></el-step>
                            <el-step title="步骤 2"></el-step>
                            <el-step title="步骤 3" description="这是一段很长很长很长的描述性文字"></el-step>
                        </el-steps>
                    </div>
                </el-aside>
                <el-main>
                    <el-row>
                        <el-col :span="8">
                            Please specify your name:
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-select v-model="value" placeholder="请选择">
                                <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="8">
                            <el-button type="success">Confirm</el-button>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-button type="primary" icon="el-icon-circle-plus" @click="showAddRecordsDialog = true">
                                Add record
                            </el-button>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-table
                                :data="records"
                                style="width: 100%">
                            <el-table-column type="expand">

                                <el-form label-position="left" inline class="demo-table-expand" slot-scope="props">
                                    <el-form-item label="ID">
                                        <span>{{ props.row.id }}</span>
                                    </el-form-item>
                                    <el-form-item label="Event">
                                        <span>{{ props.row.event }}</span>
                                    </el-form-item>
                                    <el-form-item label="Total Amount">
                                        <span>{{ props.row.totalAmount }}</span>
                                    </el-form-item>
                                    <el-form-item label="People">
                                        <span>{{ props.row.people }}</span>
                                    </el-form-item>
                                    <el-form-item label="Avg Amount">
                                        <span>{{ props.row.avgAmount }}</span>
                                    </el-form-item>
                                    <el-form-item label="Time">
                                        <span>{{ props.row.time | formatDate }}</span>
                                    </el-form-item>
                                    <el-form-item label="Comment">
                                        <span>{{ props.row.comment }}</span>
                                    </el-form-item>
                                </el-form>

                            </el-table-column>
                            <el-table-column
                                    prop="id"
                                    label="ID"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    prop="event"
                                    label="Event"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    prop="totalAmount"
                                    label="Total Amount"
                                    width="180"
                            >
                            </el-table-column>
                            <el-table-column
                                    prop="people"
                                    label="People"
                                    width="180"
                            >
                            </el-table-column>
                        </el-table>

                    </el-row>
                    <el-dialog title="Add records" :visible.sync="showAddRecordsDialog">
                        <el-form :model="addRecordsTemplate" :rules="addRecordsTemplateRules">
                            <el-form-item label="Event" label-width="120px" prop="event">
                                <el-input v-model="addRecordsTemplate.event" auto-complete="off"
                                          placeholder="Brief description of event"></el-input>
                            </el-form-item>
                            <el-form-item label="Total amount" label-width="120px" prop="totalAmount">
                                <el-input
                                        placeholder="Total amount of money spent"
                                        suffix-icon="el-icon-info"
                                        v-model.number="addRecordsTemplate.totalAmount">
                                </el-input>
                            </el-form-item>

                            <el-form-item label="People" label-width="120px" prop="people">

                                <el-select v-model="addRecordsTemplate.involvedPeople" multiple
                                           placeholder="Please choose">
                                    <el-option v-for="p in people" :label="p" :key="p" :value="p"></el-option>

                                </el-select>
                            </el-form-item>

                            <!--el-form-item label="Demo" label-width="120px" prop="demo">
                                <el-select v-model="value5" multiple placeholder="请选择">
                                    <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                                {{value5}}
                            </el-form-item-->
                            <el-form-item label="Date" label-width="120px" prop="date">
                                <el-date-picker
                                        v-model="addRecordsTemplate.time"
                                        type="date"
                                        placeholder="choose date">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="Comment" label-width="120px" prop="comment">
                                <el-input
                                        type="textarea"
                                        :rows="2"
                                        placeholder="Enter the comments"
                                        v-model="textarea">
                                </el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="cancelAddRecords()">Cancel</el-button>
                            <el-button type="primary" @click="submitAddRecords()">Confirm</el-button>
                        </div>
                    </el-dialog>

                </el-main>
            </el-container>
        </el-container>

    </div>
</template>

<script>
    const utils = require('../utils/utils');

    export default {
        name: 'HelloWorld',
        data () {
            return {
                roomId: '1234',
                author: 'Yifan Qin',
                options: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                value: '',
                active: 0,
                records: [{
                    id: 1,
                    event: "ACW",
                    totalAmount: 100,
                    people: "Yifan",
                    avgAmount: 10,
                    time: "2018-1-1",
                    comment: "This is a demo"
                }],
                showAddRecordsDialog: false,
                addRecordsTemplate: {
                    involvedPeople: [],
                    time: '',
                    totalAmount: '',
                    event: '',
                    comment: ''
                },
                people: ['Yifan Qin', 'Yuting Shi1', 'Yi Wang', 'Yifan Qin1', 'Yuting Shi', 'Yi Wang1'],
                addRecordsTemplateRules: {
                    event: [{
                        required: true,
                        message: "Event description cannot be empty.",
                        trigger: 'blur'
                    }],
                    totalAmount: [{
                        required: true, message: 'Total amount of money must be entered.'
                    }, {
                        type: 'number', message: 'The amount must be number.'
                    }],
                    people: [
                        {required: true, message: 'People involved cannot be empty.', trigger: 'blur'}
                        //TODO (to be fixed)
                        // actually the trigger should be 'change', but I cannot fix the bug that even if I have selected
                        // people, it shows the error message as well.
                    ],


                },
                rules: {},
                ruleForm: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },

            }
        },
        methods: {
            submitAddRecords(){

//                let test = {
//                    dbName: "test",
//                    collectionName: "record",
//                    operation: 2, // search
//                    document: {
//                        roomId: "1234",
//                        author: "Yifan Qin",
//                        event: "Lady M",
//                        totalAmount: 9.0,
//                        involvedPeople: ["Yifan Qin", "Yi Wang", "Yuling Guan"],
//                        averageAmount: 3.0,
//                        time: Date.UTC(2018, 1, 2), // Notice that 1 here represents February
//                        comment: "Very nice!"
//                    },
//                    projectionDoc:{
//                        roomId:1,
//                        event:1
//                    }
//                };

                let wrappedAddRecordsTemplate = {
                    document: this.wrapRecordsTemplate(this.addRecordsTemplate)
                };
                let submitAddRecordsRequest = utils.getDbOperationTemplate(0, 'record', wrappedAddRecordsTemplate);
                this.$http.post('/db', submitAddRecordsRequest).then(res => {
                    let receiveData = res.data;

                    if (receiveData == 'Success!') {
                        this.$message({
                            type: 'success', // info,success,warning,error
                            message: "Success!"
                        });
                    }
                    this.refreshRecords();
                    this.addRecordsTemplate = {};
                }).catch(err => {
                    console.log(err);
                    this.$message({
                        type: 'error', // info,success,warning,error
                        message: err
                    });
                });
                this.showAddRecordsDialog = false;
            },
            cancelAddRecords(){
                this.showAddRecordsDialog = false;
                this.addRecordsTemplate = {};
                this.$message({
                    type: 'warning', // info,success,warning,error
                    message: 'Cancelled.'
                });

            },
            wrapRecordsTemplate(recordsTemplate){
                recordsTemplate['roomId'] = this.roomId;
                recordsTemplate['author'] = this.author;
                return recordsTemplate;
            },
            refreshRecords(){
                let wrappedFetchRecordsTemplate = {
                    document: this.wrapRecordsTemplate({}),
                    projectionDoc: {
                        event: 1,
                        totalAmount: 1,
                        involvedPeople: 1,
                        averageAmount: 1,
                        time: 1,
                        comment: 1
                    }

                };
                let fetchRecordsRequest = utils.getDbOperationTemplate(2, 'record', wrappedFetchRecordsTemplate)
                this.$http.post('/db', fetchRecordsRequest).then(res => {
                    let receivedData = res.data;
                    this.records = [];
                    for (let i in receivedData) {
                        if (receivedData.hasOwnProperty(i)) {
                            let data = receivedData[i];
                            let tmpRecord = {
                                id: i,
                                event: data.event,
                                totalAmount: data.totalAmount,
                                people: data.involvedPeople,
                                avgAmount: data.totalAmount / data.involvedPeople.length,
                                time: data.time,
                                comment: data.comment
                            };
                            this.records.push(tmpRecord);
                        }
                    }

                }).catch(err => console.log(err));


            }


            //TODO(if confirmed, the records will be sent to backend and template will be refreshed.

        },
        mounted: function(){
            this.refreshRecords();
        },
        filters: {
            formatDate (timeString){
                let d = new Date(Date.parse(timeString));
                return d.toLocaleDateString();
            }
        }


    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }

    .el-row {
        padding: 10px;
        text-align: left;
    }

    .demo-table-expand label {
        color: #99a9bf;
    }

    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }

    el-form-item {
        text-align: left;
    }
</style>
