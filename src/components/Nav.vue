<template>
    <div id="nav">
        <el-menu :default-active="activeIndex" mode="horizontal" class="el-menu-demo" @select="handleSelect">
            <el-menu-item><img src="../assets/pay.svg" width="40px"></el-menu-item>
            <el-menu-item index="homepage">HomePage</el-menu-item>

            <el-menu-item index="about">About</el-menu-item>
            <el-menu-item index="room" v-if="insideRoom" style="float: right">Room : {{roomName}}</el-menu-item>
            <el-menu-item index="create" v-if="!insideRoom" style="float: right">Create</el-menu-item>
            <!--TODO change nav bar to adjust to mobile screen-->
        </el-menu>
    </div>
</template>
<script>
    export default{
        name: 'nav',
        props:['activeIndex','insideRoom','roomName'],
        methods:{
            handleSelect: function(key,keyPath){
                let pathMap = {
                    homepage:{name:'Entrance'},
                    create:{name:'Create'}
                };
                this.$router.push(pathMap[key]);
                //console.log(key,keyPath);
            }
        }

    }
</script>
<style scoped>


</style>