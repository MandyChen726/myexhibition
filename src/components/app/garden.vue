<script setup>
import { ref, computed, watch, h } from 'vue';
import { type } from './app';
import {
    NEllipsis,
    NTime,
    useMessage
} from 'naive-ui';
import RedeemService from '../../api/redeem/redeem.services';
import RecordService from '../../api/record/record.services';

const message = useMessage();

const readyRender = ref(false);

const loading = ref(false);

const loading2 = ref(false);

const props = defineProps({
    familyID: String,
    identity: Number,
    credit: Number,
    startTime: String,
    endTime: String,
})

const emit = defineEmits(['getCredit'])

const showDrawer = ref(false);

const showCreateRedeemModal = ref(false);

const showRedeemModal = ref(false);

const background = ref("");

const bodyStyle = {
    width: '85vw'
}

const items = ref([])

const isEditting = ref(false);

const formRef = ref(null)

const redeemFormRef = ref(null)

const curItem = ref(null)

const formModel = ref(
    {
        label: "",
        type: null,
        price: 1,
        stock: 0
    }
)

const redeemFormModel = ref(
    {
        quantity: 1
    }
)

const rules = {
    label: {
        required: true,
        message: '请输入兑换物名称',
        trigger: 'blur'
    },
    type: {
        required: true,
        validator(rule, value) {
            if (!value) {
                return new Error('请输入兑换物类型')
            }
            return true
        },
        trigger: ['blur', 'change']
    },
    price: {
        required: true,
        type: 'number',
        validator(rule, value) {
            if (value < 0 || !Number.isInteger(value)) {
                return new Error('请输入大于 0 的整数')
            }
            return true
        },
        trigger: ['blur', 'change', 'input']
    },
    stock: {
        required: true,
        type: 'number',
        validator(rule, value) {
            if (value < 0 || value > 99 || !Number.isInteger(value)) {
                return new Error('请输入 0 - 99 的整数')
            }
            return true
        },
        trigger: ['blur', 'change', 'input']
    }
}

const redeemRules = {
    quantity: {
        required: true,
        type: 'number',
        validator(rule, value) {
            if (value < 1 || value > curItem.value.stock || !Number.isInteger(value)) {
                return new Error('请输入库存允许兑换的数量')
            }
            return true
        },
        trigger: ['blur', 'change', 'input']
    }
}

const columns = [
    {
        title: "事件",
        key: "label",
        render: (row) => {
            return row.redeem ? h(NEllipsis,
                { lineClamp: 1 },
                {
                    default: () => "兑换 " + row.redeem.label + " ×" + row.quantity
                }
            ) : h(
                "div",
                null,
                "起床打卡"
            )
        }
    },
    {
        title: "变化",
        key: "label",
        width: 60,
        render: (row) => {
            return h(
                "div",
                {
                    style: { color: row.action < 0 ? "red" : "green" }
                },
                (row.action > 0 ? "+" : "") + row.action
            )
        }
    },
    {
        title: "发生时间",
        key: "createdAt",
        width: 120,
        render: (row) => {
            return h(
                NTime,
                {
                    time: new Date(row.createdAt)
                },
            )
        }
    },
];

const recordData = ref([])

const page = ref(1)

const pageCount = ref(1);

const pagination = computed(() => ({
    pageSize: 10,
    pageCount: pageCount.value,
    page: page.value
}))

const tableHeight = 'calc(90vh - 28px - 51px - 12px)';

initial();

function initial() {
    RedeemService.findAllByFamilyId(props.familyID)
        .then(res => {
            items.value = res.data;
            readyRender.value = true;
        })
        .catch(err => {
            message.error(err.message)
        })
}

function handleOpenModal(action, item) {
    if (props.identity == 1) {
        switch (action) {
            case 1:
                isEditting.value = false;
                break;
            case 2:
                isEditting.value = true;
                curItem.value = item;
                formModel.value = {
                    label: item.label,
                    type: item.type,
                    price: item.price,
                    stock: item.stock
                };
                break;
            default:
                break;
        }
        showCreateRedeemModal.value = true;
    } else if (props.identity == 2) {
        curItem.value = item;
        showRedeemModal.value = true;
    }
}

function handleSubmitForm(e) {
    e.preventDefault();
    formRef.value?.validate((errors) => {
        if (!errors) {
            if (!isEditting.value) {
                loading2.value = true;
                RedeemService.create({ familyUID: props.familyID, ...formModel.value })
                    .then(res => {
                        items.value.push(res.data);
                        message.success("添加成功")
                        showCreateRedeemModal.value = false;
                        loading2.value = false;
                    })
                    .catch(err => {
                        message.error(err.message)
                        loading2.value = false;
                    })
            } else {
                loading2.value = true;
                RedeemService.update(curItem.value.id, props.familyID, formModel.value)
                    .then(res => {
                        const updatedRedeem = res.data;
                        const index = items.value.findIndex(item => item.id === updatedRedeem.id);
                        if (index !== -1) {
                            items.value[index] = updatedRedeem;
                            message.success("修改成功")
                            showCreateRedeemModal.value = false;
                            loading2.value = false;
                        }
                    })
                    .catch(err => {
                        message.error(err.message)
                        loading2.value = false;
                    })
            }
        }
    });
}

function handleChangeRedeemStatus() {
    loading.value = true;
    curItem.value.status = !curItem.value.status;
    RedeemService.update(curItem.value.id, props.familyID, { status: curItem.value.status })
        .then(res => {
            const updatedRedeem = res.data;
            const index = items.value.findIndex(item => item.id === updatedRedeem.id);
            if (index !== -1) {
                items.value[index] = updatedRedeem;
                message.success("修改成功")
            }
            loading.value = false;
        })
        .catch(err => {
            message.error(err.message)
            loading.value = false
        })
}

function confirmRedeem(e) {
    e.preventDefault();
    redeemFormRef.value?.validate((errors) => {
        if (!errors) {
            if (props.credit < (curItem.value.price * redeemFormModel.value.quantity)) {
                message.error("积分不足，无法兑换")
            } else {
                loading.value = true;
                RecordService.create({
                    action: -(curItem.value.price * redeemFormModel.value.quantity),
                    familyUID: props.familyID,
                    quantity: redeemFormModel.value.quantity,
                    redeemId: curItem.value.id
                }).then(res => {
                    if (res.status == 200) {
                        const index = items.value.findIndex(item => item.id === curItem.value.id);
                        if (index !== -1) {
                            items.value[index].stock -= redeemFormModel.value.quantity;
                        }
                        emit("getCredit", props.credit - (curItem.value.price * redeemFormModel.value.quantity));
                        loading.value = false;
                    } else {
                        message.error(res.data.message)
                        const index = items.value.findIndex(item => item.id === curItem.value.id);
                        if (index !== -1) {
                            items.value[index] = res.data.redeem;
                        }
                    }
                });
                message.success("兑换成功，请前往我的积分查看")
                showRedeemModal.value = false;
            }
        } else {
            message.error("请检查兑换数量")
        }
    });
}

function handleCloseModal() {
    resetForm();
}

function resetForm() {
    curItem.value = null;
    redeemFormModel.value = {
        quantity: 1
    };
    formModel.value = {
        label: "",
        type: null,
        price: 1,
        stock: 1
    }
}

function handleOpenDrawer() {
    showDrawer.value = true;
    loading.value = true;
    RecordService.findAllByFamilyId(props.familyID, page.value - 1)
        .then(res => {
            recordData.value = res.data.result;
            pageCount.value = res.data.pageCount;
            loading.value = false;
        })
        .catch(err => {
            message.error(err.message)
            loading.value = false;
        })
}

function handlePageChange(curPage) {
    page.value = curPage;
    loading.value = true;
    RecordService.findAllByFamilyId(props.familyID, page.value - 1)
        .then(res => {
            recordData.value = res.data.result;
            pageCount.value = res.data.pageCount;
            loading.value = false;
        })
        .catch(err => {
            message.error(err.message)
            loading.value = false;
        })
}
</script>

<template>
    <n-layout v-if="readyRender" class="gardenContainer" :style="{ background }">
        <div>
            <n-flex :justify="'space-between'" :align="'center'" style="padding: 24px;">
                <n-flex v-if="identity == 1" class="mySunrise" :align="'center'" @click="handleOpenModal(1)">
                    <n-icon>
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                            viewBox="0 0 12 12">
                            <g fill="none">
                                <path
                                    d="M6.5 1.75a.75.75 0 0 0-1.5 0V5H1.75a.75.75 0 0 0 0 1.5H5v3.25a.75.75 0 0 0 1.5 0V6.5h3.25a.75.75 0 0 0 0-1.5H6.5V1.75z"
                                    fill="currentColor"></path>
                            </g>
                        </svg>
                    </n-icon>
                    <div style="font-size: 18px">{{ `添加` }}</div>
                </n-flex>
                <n-flex v-else-if="identity == 2" class="mySunrise" :align="'center'">
                    <div style="font-size: 18px">{{ `My credit: ${credit} ☀️` }}</div>
                </n-flex>
                <n-flex>
                    <n-button type="primary" style="border-radius: 8px;" size="large" @click="handleOpenDrawer"
                        :loading="loading">积分记录</n-button>
                </n-flex>
            </n-flex>
            <n-modal :mask-closable="false" v-model:show="showRedeemModal" class="custom-card" preset="card"
                :style="bodyStyle" size="huge" title="兑换确认" :bordered="false" :auto-focus="false"
                @after-leave="handleCloseModal">
                <n-flex vertical :size="24">
                    <n-form ref="redeemFormRef" :model="redeemFormModel" :rules="redeemRules" label-placement="left">
                        <n-form-item label="兑换数量" path="quantity">
                            <n-input-number style="width: 100%" :min="1" :max="curItem.stock"
                                v-model:value="redeemFormModel.quantity" />
                        </n-form-item>
                    </n-form>
                    <n-card>
                        <n-grid :x-gap="4" style="align-items: center;">
                            <n-gi :span="4">
                                <img style="width: 100%"
                                    :src="`./myexhibition/LuckyCat/app/garden/${curItem.type}.webp`" />
                            </n-gi>
                            <n-gi :span="16" style="text-align: center;">
                                <n-ellipsis style="width: 100%">{{ curItem.label }}</n-ellipsis>
                            </n-gi>
                            <n-gi :span="4" style="text-align: right;">
                                <div>×{{ redeemFormModel.quantity }}</div>
                            </n-gi>
                        </n-grid>
                    </n-card>
                    <div style="text-align: center;">
                        {{ `你确定要花费 ${redeemFormModel.quantity * curItem.price} ☀️ 兑换该物品吗？` }}
                    </div>
                    <n-button @click="confirmRedeem" type="primary" :loading="loading">确定兑换</n-button>
                </n-flex>
            </n-modal>
            <n-modal :mask-closable="false" v-model:show="showCreateRedeemModal" class="custom-card" preset="card"
                :style="bodyStyle" :title="!isEditting ? '添加兑换物' : '修改兑换物'" size="huge" :bordered="false"
                :auto-focus="false" @after-leave="handleCloseModal">
                <n-flex vertical :size="24">
                    <n-flex class="itemImg" :align="'center'" :justify="'center'">
                        <img style="width: 70%"
                            :src="`./myexhibition/LuckyCat/app/garden/${formModel.type === null ? 0 : formModel.type}.webp`" />
                    </n-flex>
                    <n-form ref="formRef" :model="formModel" :rules="rules" label-placement="top">
                        <n-form-item label="名称" path="label">
                            <n-input v-model:value="formModel.label" placeholder="输入兑换物名称" />
                        </n-form-item>
                        <n-form-item label="类型" path="type">
                            <n-select v-model:value="formModel.type" value-field="type" :options="type" filterable
                                placeholder="选择兑换物类型" />
                        </n-form-item>
                        <n-grid :x-gap="12">
                            <n-form-item-gi :span="12" label="所需积分" path="price">
                                <n-input-number style="width: 100%" :min="1" v-model:value="formModel.price" />
                            </n-form-item-gi>
                            <n-form-item-gi :span="12" label="库存" path="stock">
                                <n-input-number style="width: 100%" :min="0" :max="99" :precision="0"
                                    v-model:value="formModel.stock" />
                            </n-form-item-gi>
                        </n-grid>
                        <n-grid :x-gap="12">
                            <n-gi v-if="isEditting" :span="12">
                                <n-button v-if="curItem.status" style="width: 100%" type="error"
                                    @click="handleChangeRedeemStatus" :loading="loading">
                                    {{ "下架该兑换物" }}
                                </n-button>
                                <n-button v-else style="width: 100%" type="success" @click="handleChangeRedeemStatus"
                                    :loading="loading">
                                    {{ "上架该兑换物" }}
                                </n-button>
                            </n-gi>
                            <n-gi :span="isEditting ? 12 : 24">
                                <n-button style="width: 100%" type="primary" @click="handleSubmitForm"
                                    :loading="loading2">
                                    {{ !isEditting ? "确认添加" : "确认修改" }}
                                </n-button>
                            </n-gi>
                        </n-grid>
                    </n-form>
                </n-flex>
            </n-modal>
            <n-grid class="itemContainer" :cols="2" :y-gap="12">
                <n-gi class="item" v-for="(item, index) in items">
                    <div class="item"
                        :style="{ padding: `0px ${(index % 2) ? '24px' : '12px'} 24px ${(index % 2) ? '12px' : '24px'}` }">
                        <n-flex class="itemInfo" vertical>
                            <n-flex class="itemImg" :align="'center'" :justify="'center'">
                                <img :src="`./myexhibition/LuckyCat/app/garden/${item.type}.webp`"
                                    :style="{ opacity: item.stock ? '1' : '0.4' }" />
                                <img v-if="!item.stock" class="soldoutImg"
                                    :src="`./myexhibition/LuckyCat/app/garden/soldout.webp`" />
                            </n-flex>
                            <n-flex :justify="'space-between'" :align="'center'">
                                <n-tag :bordered="false">{{ type[item.type - 1].label }}</n-tag>
                                <div v-if="item.status">库存: {{ item.stock }}</div>
                                <n-tag v-else :bordered="false" type="error">已下架</n-tag>
                            </n-flex>
                            <div class="label">
                                <n-ellipsis>{{ item.label }}</n-ellipsis>
                            </div>
                            <n-button :disabled="identity === 2 && (!item.stock || !item.status)" type="primary"
                                class="price" strong @click="handleOpenModal(2, item)">
                                {{ item.price + " ☀️" + (identity == 1 ? " 修改" : "") }}
                            </n-button>
                        </n-flex>
                    </div>
                </n-gi>
            </n-grid>
            <div style="height: 92px"></div>
        </div>
        <n-drawer v-model:show="showDrawer" :width="'100vw'" :placement="'right'" :inert="!showDrawer"
            :auto-focus="false">
            <n-drawer-content title="积分记录" closable>
                <n-spin :show="loading">
                    <n-data-table :max-height="tableHeight" :min-height="tableHeight" :columns="columns"
                        :data="recordData" :pagination="pagination" striped remote
                        :on-update:page="handlePageChange"></n-data-table>
                </n-spin>
            </n-drawer-content>
        </n-drawer>
    </n-layout>
    <n-flex v-else class="gardenContainer" :justify="'center'" :align="'center'">
        <n-flex vertical :size="24">
            <n-spin :size="64">
            </n-spin>
            <div><b>LOADING...</b></div>
        </n-flex>
    </n-flex>
</template>

<style lang='less' scoped>
.gardenContainer {
    height: calc(100vh);

    .mySunrise {
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.6);
        backdrop-filter: blur(15px);
        padding: 6px 18px;
    }

    .itemContainer {
        width: 100%;

        .item {
            position: relative;

            .luckycat {
                position: absolute;
                z-index: 5;
                bottom: 20px;

                img {
                    height: 160px;
                }
            }
        }

        .itemInfo {
            background: #ffffffeb;
            position: relative;
            margin-top: 12px;
            z-index: 10;
            border-radius: 8px;
            padding: 8px;

            .label {
                font-size: 18px;
            }

            .price {
                border-radius: 8px;
                font-size: 16px;
            }
        }
    }
}

.itemImg {
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: 12px;
    position: relative;
    z-index: 10;

    img {
        width: 80%;
    }

    .soldoutImg {
        position: absolute;
    }
}
</style>