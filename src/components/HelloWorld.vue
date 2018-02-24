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
                            <el-button type="primary" icon="el-icon-circle-plus" @click="addRecords = true">Add record</el-button>
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
                                            <span>{{ props.row.time }}</span>
                                        </el-form-item>
                                        <el-form-item label="Description">
                                            <span>{{ props.row.description }}</span>
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
                    <el-dialog title="Add records" :visible.sync="addRecords">
                        <el-form :model="addRecordsTemplate">
                            <el-form-item label="Event" label-width="120px">
                                <el-input v-model="addRecordsTemplate.event" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="Total amount" label-width="120px">
                                <el-input
                                        placeholder="Total amount of money spent"
                                        suffix-icon="el-icon-date"
                                        v-model="addRecordsTemplate.totalAmount">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="People involved" label-width="120px">
                                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">Select all</el-checkbox>
                                <div style="margin: 15px 0;"></div>
                                <el-checkbox-group v-model="addRecordsTemplate.checkedPeople" @change="handleCheckedCitiesChange">
                                    <el-checkbox v-for="p in people" :label="p" :key="p">{{p}}</el-checkbox>
                                </el-checkbox-group>
                                {{checkedPeople}}
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="addRecords = false">Cancel</el-button>
                            <el-button type="primary" @click="addRecords = false">Confirm</el-button>
                        </div>
                    </el-dialog>

                </el-main>
            </el-container>
        </el-container>

    </div>
</template>

<script>
    export default {
        name: 'HelloWorld',
        data () {
            return {
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
                records:[{id:1,event:"ACW",totalAmount:100,people:"Yifan",avgAmount:10,time:"2018-1-1",description:"This is a demo"}],
                addRecords: false,
                addRecordsTemplate: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: '',
                    checkedPeople:[],
                },

                isIndeterminate: true,
                checkAll:false,
                people:['Yifan Qin','Yuting Shi','Yi Wang','Yifan Qin','Yuting Shi','Yi Wang']



            }
        },
        methods: {
            next() {
                if (this.active++ > 2) this.active = 0;
            },
            handleCheckAllChange(val) {
                this.checkedPeople = val ? this.people : [];
                this.isIndeterminate = false;
            },
            handleCheckedCitiesChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.people.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.people.length;
            }
            //TODO(if confirmed, the records will be sent to backend and template will be refreshed.

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
</style>
