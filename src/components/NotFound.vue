<template>
    <div class="404">
        <el-container>
            <el-header>

            </el-header>
            <el-main>
                <div class="center">

                    <el-alert
                            show-icon
                            title="404 Not found"
                            type="error">
                    </el-alert>


                </div>

            </el-main>
        </el-container>

    </div>
</template>
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