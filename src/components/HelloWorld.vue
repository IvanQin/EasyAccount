<template>
    <div class="hello">
        <el-container>
            <el-header>Header</el-header>
            <el-container>
                <!--el-aside>
                    <div style="height: 600px;margin: auto;padding: 10px 50px">
                        <el-steps direction="vertical" :active="1">
                            <el-step title="步骤 1"></el-step>
                            <el-step title="步骤 2"></el-step>
                            <el-step title="步骤 3" description="这是一段很长很长很长的描述性文字"></el-step>
                        </el-steps>
                    </div>
                </el-aside-->
                <el-main>
                    <el-card class="box-card">
                        <el-row>
                            <el-col>
                                Please specify your name:
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="10">
                                <el-select v-model="tmpAuthor" placeholder="Tell us who you are">
                                    <el-option
                                            v-for="p in people"
                                            :key="p.id"
                                            :label="p"
                                            :value="p">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="8">
                                <el-button type="success" @click="confirmAuthor">Confirm</el-button>
                            </el-col>
                        </el-row>
                    </el-card>
                    <el-card class="box-card">
                        <el-row>
                            <el-col :span="8">
                                <el-button type="primary" icon="el-icon-circle-plus"
                                           @click="beforeShowAddRecordsDialog()" :disabled="authorNotConfirmed">
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
                                        <span>
                                            <el-tag v-for="p in props.row.people" :key="p.id"
                                                    :style="tagColor(p,false)"
                                                    :color="tagColor(p,true)">{{p}}</el-tag>
                                        </span>
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
                                        :width="tableColumnWidth.id">
                                </el-table-column>
                                <el-table-column
                                        prop="event"
                                        label="Event"
                                        :width="tableColumnWidth.event">
                                </el-table-column>
                                <el-table-column
                                        prop="totalAmount"
                                        label="Total Amount"
                                        :width="tableColumnWidth.totalAmount"
                                >
                                </el-table-column>
                                <el-table-column
                                        prop="people"
                                        label="People"
                                        :width="tableColumnWidth.people"
                                >
                                    <template slot-scope="props">
                                        <span><el-tag v-for="p in props.row.people" :key="p.id"
                                                      :style="tagColor(p,false)"
                                                      :color="tagColor(p,true)">{{p}}</el-tag></span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="Operation">
                                    <template slot-scope="props">
                                        <el-button
                                                size="mini"
                                                type="info"
                                                @click="handleEdit(props.$index, props.row)" style="margin: 2px 2px">
                                            Edit
                                        </el-button>
                                        <el-button
                                                size="mini"
                                                type="danger"
                                                @click="handleDelete(props.$index, props.row)" style="margin: 2px 2px">
                                            Delete
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>

                        </el-row>
                    </el-card>
                    <el-card class="box-card">
                        <el-row>
                            <el-table
                                    :data="totalRecords"
                                    style="width: 100%">
                                <el-table-column type="expand">

                                    <el-form label-position="left" inline class="demo-table-expand" slot-scope="props">
                                        <el-form-item label="ID">
                                            <span>{{ props.row.id }}</span>
                                        </el-form-item>
                                        <el-form-item label="Author">
                                            <span>{{ props.row.author }}</span>
                                        </el-form-item>
                                        <el-form-item label="Event">
                                            <span>{{ props.row.event }}</span>
                                        </el-form-item>
                                        <el-form-item label="Total Amount">
                                            <span>{{ props.row.totalAmount }}</span>
                                        </el-form-item>
                                        <!--el-form-item label="People">
                                            <span>{{ props.row.people }}</span>
                                        </el-form-item-->
                                        <el-form-item label="People">
                                        <span>
                                            <el-tag v-for="p in props.row.people" :key="p.id" :style="tagColor(p,false)"
                                                    :color="tagColor(p,true)">{{p}}</el-tag>
                                        </span>
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
                                        :width="tableColumnWidth.id">
                                </el-table-column>
                                <el-table-column
                                        prop="event"
                                        label="Event"
                                        :width="tableColumnWidth.event">
                                </el-table-column>
                                <el-table-column
                                        prop="totalAmount"
                                        label="Total Amount"
                                        :width="tableColumnWidth.totalAmount"
                                >
                                </el-table-column>
                                </el-table-column>
                                <el-table-column
                                        prop="people"
                                        label="People"
                                        :width="tableColumnWidth.people"
                                >
                                    <template slot-scope="props">
                                        <span><el-tag v-for="p in props.row.people" :key="p.id"
                                                      :style="tagColor(p,false)"
                                                      :color="tagColor(p,true)">{{p}}</el-tag></span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="author" label="Author" :width="tableColumnWidth.author">

                                </el-table-column>
                            </el-table>

                        </el-row>
                    </el-card>
                    <el-card class="box-card">
                        <el-collapse accordion>
                            <el-collapse-item v-for="info in accountInfo" :key="info.id">
                                <template slot="title">
                                    <div v-if="info.giveMoney">
                                        Give
                                        <el-tag>{{formMoney(info.amount)}}</el-tag>
                                        to
                                        <el-tag>{{info.name}}</el-tag>
                                    </div>
                                    <div v-else>
                                        Request
                                        <el-tag>{{formMoney(info.amount)}}</el-tag>
                                        from
                                        <el-tag>{{info.name}}</el-tag>
                                    </div>
                                </template>

                            </el-collapse-item>
                        </el-collapse>
                    </el-card>
                    <el-dialog title="Add records" :visible.sync="showAddRecordsDialog"
                               :before-close="cancelAddRecords">
                        <el-form :model="addRecordsTemplate" :rules="addRecordsTemplateRules" ref="addRecordsForm" :before-close="cancelAddRecords">
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
                                        placeholder="choose date"
                                        style="overflow: auto"
                                >
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="Comment" label-width="120px" prop="comment">
                                <el-input
                                        type="textarea"
                                        :rows="2"
                                        placeholder="Enter the comments"
                                        v-model="addRecordsTemplate.comment">
                                </el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="cancelAddRecords">Cancel</el-button>
                            <el-button type="primary" @click="submitAddRecords()">Confirm</el-button>
                        </div>
                    </el-dialog>

                    <el-dialog title="Edit records" :visible.sync="showEditRecordsDialog">
                        <el-form :model="editRecordsTemplate" :rules="addRecordsTemplateRules">
                            <el-form-item label="Event" label-width="120px" prop="event">
                                <el-input v-model="editRecordsTemplate.event" auto-complete="off"
                                          placeholder="Brief description of event"></el-input>
                            </el-form-item>
                            <el-form-item label="Total amount" label-width="120px" prop="totalAmount">
                                <el-input
                                        placeholder="Total amount of money spent"
                                        suffix-icon="el-icon-info"
                                        v-model.number="editRecordsTemplate.totalAmount">
                                </el-input>
                            </el-form-item>

                            <el-form-item label="People" label-width="120px" prop="people">

                                <el-select v-model="editRecordsTemplate.involvedPeople" multiple
                                           placeholder="Please choose">
                                    <el-option v-for="p in people" :label="p" :key="p" :value="p"></el-option>

                                </el-select>
                            </el-form-item>

                            </el-form-item-->
                            <el-form-item label="Date" label-width="120px" prop="date">
                                <el-date-picker
                                        v-model="editRecordsTemplate.time"
                                        type="date"
                                        placeholder="choose date">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="Comment" label-width="120px" prop="comment">
                                <el-input
                                        type="textarea"
                                        :rows="2"
                                        placeholder="Enter the comments"
                                        v-model="editRecordsTemplate.comment">
                                </el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="cancelEditRecords">Cancel</el-button>
                            <el-button type="primary" @click="submitEditRecords()">Confirm</el-button>
                        </div>
                    </el-dialog>
                </el-main>
            </el-container>
        </el-container>

    </div>
</template>

<script>
    const utils = require('../utils/utils');
    const account = require('../utils/account');
    const SUCCESS_MSG = 'Success!';
    const currencyUnitToSign = {
        USD: '$',
        CNY: '¥'
    };
    const peopleIdToColor = [
        {bg: '#FFFFFF', font: '#545454'},
        {bg: '#fae6d1', font: '#E88C67'},
        {bg: '#d1f3fa', font: '#30c9e8'},
        {bg: '#d1e3fa', font: '#4286F3'},
        {bg: '#fad3d1', font: '#EB4537'},
        {bg: '#faf9d1', font: '#FAC230'},
        {bg: '#d1fad7', font: '#55AF7B'},
        {bg: '#e5d1fa', font: '#8930e8'}
    ];
    export default {
        name: 'HelloWorld',
        data () {
            return {
                roomId: '',
                roomCreateTime: '',
                author: '',
                tmpAuthor: '',
                currencyUnit: '', // need changed
                active: 0,
                records: [],
                totalRecords: [],
                showAddRecordsDialog: false,
                showEditRecordsDialog: false,
                addRecordsTemplate: {
                    involvedPeople: [],
                    time: '',
                    totalAmount: '',
                    event: '',
                    comment: ''
                },
                editRecordsTemplate: {
                    involvedPeople: [],
                    time: '',
                    totalAmount: '',
                    event: '',
                    comment: '',
                    dbId: ''
                },
                people: [],
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
                matrix: [[]],
                authorNotConfirmed: true,
                tableColumnWidth: {
                    id: 50,
                    event: 180,
                    totalAmount: 100,
                    people: 180,
                    author: 180,
                }

            }
        },
        methods: {
            submitAddRecords(){

                let wrappedAddRecordsTemplate = {
                    document: this.wrapRecordsTemplate(this.addRecordsTemplate)
                };
                let submitAddRecordsRequest = utils.getDbOperationTemplate(utils.INSERT, 'record', wrappedAddRecordsTemplate);
                this.$http.post('/db', submitAddRecordsRequest).then(res => {
                    let receiveData = res.data;

                    if (receiveData == SUCCESS_MSG) {
                        this.$message({
                            type: 'success', // info,success,warning,error
                            message: "Success adding the record!"
                        });
                    }
                    this.refreshMyRecords();
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
            submitEditRecords(){
                let wrappedEditRecordsTemplate = {
                    updateDoc: this.editRecordsTemplate,
                    document: {id: this.editRecordsTemplate.dbId}
                };
                let submitEditRecordsRequest = utils.getDbOperationTemplate(utils.UPDATE_BY_ID, 'record', wrappedEditRecordsTemplate); // update by id
                this.$http.post('/db', submitEditRecordsRequest).then(res => {
                    let receiveData = res.data;

                    if (receiveData == SUCCESS_MSG) {
                        this.$message({
                            type: 'success', // info,success,warning,error
                            message: "Success editing the record!"
                        });
                    }
                    this.refreshMyRecords();
                    this.editRecordsTemplate = {};
                }).catch(err => {
                    console.log(err);
                    this.$message({
                        type: 'error', // info,success,warning,error
                        message: err
                    });
                });
                this.showEditRecordsDialog = false;

            },
            cancelAddRecords(done){
                this.showAddRecordsDialog = false;
                this.resetForm('addRecordsForm');
                this.resetAddRecordsTemplate();
                this.showCancelMessage();
                done();
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            resetAddRecordsTemplate(){
                this.addRecordsTemplate = {
                    involvedPeople: [],
                    time: '',
                    totalAmount: '',
                    event: '',
                    comment: ''
                }
            },
            cancelEditRecords(){
                this.showEditRecordsDialog = false;
                this.editRecordsTemplate = {};
                this.showCancelMessage()
            },
            wrapRecordsTemplate(recordsTemplate){
                recordsTemplate['roomId'] = this.roomId;
                recordsTemplate['author'] = this.author;
                return recordsTemplate;
            },
            wrapRoomRecordsTemplate(recordsTemplate){
                recordsTemplate['roomId'] = this.roomId;
                return recordsTemplate;
            },

            refreshMyRecords(){
                this.refreshRecords().then(resolve => {
                    // receivedData = [{},{},...{}]
                    let receivedData = resolve;
                    console.log(receivedData);
                    this.records = [];
                    for (let i in receivedData) {
                        if (receivedData.hasOwnProperty(i)) {
                            let data = receivedData[i];
                            if (data.author != this.author) continue; // filtered
                            this.records.push(data);
                        }
                    }
                    this.refreshTotalRecords(false, receivedData); // refresh local records will emit refreshing all records
                }, reject => {
                    console.log(reject);
                });
            },
            /**
             * Refresh all of the records (added by all people)
             * @param isPositive if the function is called by {@link refreshMyRecords}
             * @param receivedData [{},{},...{}] where {} is the record
             */
            refreshTotalRecords(isPositive, receivedData){
                this.totalRecords = [];

                if (isPositive) {
                    this.refreshRecords().then(resolve => {
                        let receivedData = resolve;
                        for (let i in receivedData) {
                            if (receivedData.hasOwnProperty(i)) {
                                let data = receivedData[i];
                                this.totalRecords.push(data);
                            }
                        }
                    }, reject => {
                        console.log(reject);
                    });

                } else {
                    for (let i in receivedData) {
                        if (receivedData.hasOwnProperty(i)) {
                            let data = receivedData[i];
                            this.totalRecords.push(data);
                        }
                    }
                }
                // re-calculate account matrix
                let solver = new account.accountSolver(this.totalRecords, this.people, this.peopleToId);
                this.matrix = solver.runSolver();

            },
            /**
             * Send HTTP POST to db and get all the records.
             * @returns {Promise}
             */
            refreshRecords(){
                let wrappedFetchRecordsTemplate = {
                    document: this.wrapRoomRecordsTemplate({}),
                    projectionDoc: {
                        event: 1,
                        totalAmount: 1,
                        involvedPeople: 1,
                        averageAmount: 1,
                        time: 1,
                        comment: 1,
                        id: 1,
                        author: 1
                    }
                };
                let fetchRecordsRequest = utils.getDbOperationTemplate(utils.SEARCH, 'record', wrappedFetchRecordsTemplate);
                return new Promise((resolve, reject) => {
                    this.$http.post('/db', fetchRecordsRequest).then(res => {
                        let receivedData = res.data;
                        let allRecord = [];
                        for (let i in receivedData) {
                            if (receivedData.hasOwnProperty(i)) {
                                let data = receivedData[i];
                                let tmpRecord = {
                                    id: i,
                                    event: data.event,
                                    totalAmount: this.formMoney(data.totalAmount),
                                    people: data.involvedPeople,
                                    avgAmount: data.totalAmount / data.involvedPeople.length,
                                    time: data.time,
                                    comment: data.comment,
                                    dbId: data._id,
                                    author: data.author
                                };
                                allRecord.push(tmpRecord);
                            }
                        }
                        resolve(allRecord);
                    }).catch(err => {
                        console.log(err);
                        reject(err);
                    });
                });
            },
            handleEdit(index, row) {
                this.editRecordsTemplate.involvedPeople = row.people;
                this.editRecordsTemplate.time = row.time;
                this.editRecordsTemplate.event = row.event;
                this.editRecordsTemplate.comment = row.comment;
                this.editRecordsTemplate.totalAmount = row.totalAmount;
                this.editRecordsTemplate.dbId = row.dbId;
                this.showEditRecordsDialog = true;
            },
            handleDelete(index, row) {
                this.$confirm('Are you sure to delete this record?', 'Warning', {
                    confirmButtonText: 'Confirm',
                    cancelButtonText: 'Cancel',
                    type: 'warning'
                }).then(() => {
                    console.log(row.dbId);
                    let deleteRecordsRequest = utils.getDbOperationTemplate(utils.DELETE_BY_ID, 'record', {
                        document: {id: row.dbId}
                    });
                    console.log(deleteRecordsRequest);
                    this.$http.post('/db', deleteRecordsRequest).then(res => {
                        if (res.data == SUCCESS_MSG) {
                            this.refreshMyRecords();
                            this.$message({
                                type: 'success', // info,success,warning,error
                                message: 'The record has been deleted.'
                            });
                        } else {
                            this.$message({
                                type: 'error', // info,success,warning,error
                                message: 'Cannot find the record.'
                            });
                        }
                    }).catch(err => console.log(err));

                }).catch(() => {
                    this.showCancelMessage()
                });
            },
            confirmAuthor(){
                this.author = this.tmpAuthor;
                this.authorNotConfirmed = false; // enabled the add record button
                this.$message.info("You are chosen as " + this.author + ". Welcome ! ");
                //TODO change UI, delete input
                this.refreshMyRecords();
            },
            showCancelMessage(){
                this.$message({
                    type: 'warning', // info,success,warning,error
                    message: 'Cancelled.'
                });
            },
            beforeShowAddRecordsDialog(){
                if (this.author == '') {
                    this.$message.warning("Please ")

                }
                else {
                    this.showAddRecordsDialog = true;
                }
            },
            formMoney(number){
                return currencyUnitToSign[this.currencyUnit] + number;
            },
            tagColor(people, isBackground){
                let idx = this.peopleToId[people] % 1;
                if (isBackground)
                    return peopleIdToColor[idx].bg;
                let styleStr = 'color:' + peopleIdToColor[idx].font + ';border:1px solid ' +
                    utils.colorToRGBA(peopleIdToColor[idx].font, 0.1);
                return styleStr;
            }
        },
//        created: function(){
//            this.currencyUnit = 'USD';
//
//        },
        mounted: function () {
            //console.log(this.$route.query);
            if (utils.isEmpty(this.$route.params)) {
                this.roomId = sessionStorage.getItem('roomId');
                this.people = JSON.parse(sessionStorage.getItem('people'));
                this.roomCreateTime = sessionStorage.getItem('roomCreateTime');
                this.currencyUnit = sessionStorage.getItem('currencyUnit');
            }
            else {
                this.roomId = this.$route.params['roomId'];
                this.people = this.$route.params['people'];
                this.roomCreateTime = this.$route.params['roomCreateTime'];
                this.currencyUnit = this.$route.params['currencyUnit'];
                sessionStorage.setItem('roomId', this.roomId);
                sessionStorage.setItem('people', JSON.stringify(this.people));
                sessionStorage.setItem('roomCreateTime', this.roomCreateTime);
                sessionStorage.setItem('currencyUnit', this.currencyUnit);
            }
        },
        filters: {
            /* the filters cannot rely on the staffs in data*/
            formatDate (timeString){
                if (timeString == '' || timeString == null) return '';
                let d = new Date(Date.parse(timeString));
                return d.toLocaleDateString();
            },

        },
        computed: {
            // can be reached using 'this.peopleToId'
            peopleToId: function () {
                let tmpMap = {};
                for (let i = 0; i < this.people.length; i++) {
                    if (this.people.hasOwnProperty(i)) {
                        tmpMap[this.people[i]] = i;
                    }
                }
                return tmpMap;
            },
            accountInfo: function () {
                let tmpList = [];
                let yourId = this.peopleToId[this.author];
                for (let i in this.matrix[yourId]) {
                    if (this.matrix[yourId].hasOwnProperty(i)) {
                        if (i != yourId) { // do not give yourself money
                            let signedAmount = this.matrix[yourId][i];
                            tmpList.push({
                                name: this.people[i],
                                amount: signedAmount > 0 ? signedAmount : -signedAmount,
                                giveMoney: signedAmount > 0
                            })
                        }
                    }
                }
                return tmpList;
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

    .box-card {
        margin: 20px 0;
    }

    .el-tag {
        margin: 2px 2px;
    }

    @media (max-width: 768px) {
        .el-dialog {
            width: 90%;
        }

        .el-date-editor.el-input, .el-date-editor.el-input__inner {
            width: auto;
        }
    }
</style>
