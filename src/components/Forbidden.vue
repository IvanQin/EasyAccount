<template>
    <div class="403">
        <el-container>
            <el-header>

            </el-header>
            <el-main>
                <div class="center">

                    <el-alert
                            show-icon
                            title="403 forbidden"
                            :description="description"
                            type="error">
                    </el-alert>


                </div>

            </el-main>
        </el-container>

    </div>
</template>
<script>
    const utils = require('../utils/utils');
    const REDIRECT_TIME = 5;
    export default{
        data(){
            return {
                description: ''
            }
        },
        mounted: function () {
            let errorMessage = '';
            if (!utils.isEmpty(this.$route.params)) {
                errorMessage = this.$route.params['errorMessage'] ? this.$route.params['errorMessage'] : '';
            }
            let remainTime = REDIRECT_TIME;
            let redirectMessage = '';
            let redirect = () => {
                redirectMessage = ' Jump to homepage in ' + remainTime + ' seconds ...';
                this.description = errorMessage + redirectMessage;
                remainTime--;
                if (remainTime == 0) {
                    this.$router.push({
                        name: 'Entrance',
                    });
                    return;
                }
                setTimeout(redirect, 1000);
            };
            redirect();
        }
    }
</script>
<style scoped>
    .center {
        margin: auto;
        width: 500px;
        text-align: center;
    }

    @media (max-width: 768px) {
        .center {
            margin: auto;
            width: 320px;
            text-align: center;
        }
    }
</style>