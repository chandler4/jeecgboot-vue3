<template>
  <div class="p-4">
    <BasicTable
      title="用户列表"
      :canResize="false"
      :striped="false"
      :bordered="true"
      :columns="columns"
      :dataSource="users"
      :loading="loading"
      :height="340"
      :pagination="pagination"
      @change="setCurrentPage"
      :actionColumn="{
          width: 180,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
      }"
    >
      <template #tableTitle>
        <a-button preIcon="ant-design:plus-outlined" type="primary" @click="addUser" style="margin-right: 5px">新增</a-button>
      </template>

      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '编辑',
              onClick: handleEdit.bind(null, record),
            },
            {
              label: '删除',
              color: 'error',
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>

    </BasicTable>
    <UserModal @register="registerModal" @success="queryUsers" />
  </div>
</template>

<script>

  import {fetchUsers, createUser, editUser} from '@/api/business/sharedbike/sharedBike'
  import { BasicTable, TableAction } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import UserModal from './UserModal.vue';
  import md5 from 'js-md5';



  export default {
    name: 'UserList',
    components: {BasicTable, TableAction, UserModal},
    setup() {
        const [registerModal, { openModal }] = useModal();
        debugger
        return {
            registerModal,
            openModal
        }
    },
    data() {
      return {
        columns: [
            {
                title: '账户名',
                dataIndex: 'userName',
                width: 200,
            },
            {
                title: '中文名',
                dataIndex: 'cname',
                width: 200,
            },
            {
                title: '性别',
                dataIndex: 'sex',
                width: 200,
            },
            {
                title: '手机号',
                dataIndex: 'phoneNumber',
                width: 200,
            },
            {
                title: '身份证号',
                dataIndex: 'cardId',
                width: 200,
            },
            {
                title: '账号状态',
                dataIndex: 'state',
                width: 200,
            },
        ],
        pagination: {
            current: 1,
            pageSize: 10,
            pageSizeOptions: [],
            total: 0,
        },
        dialogVisible: false,
        users: [],
        regions: [],
        isEdit: false,
        isLoading: false,
        form: {
          id: undefined,
          userName: undefined,
          password: undefined,
          cname: undefined,
          cardId: undefined,
          sex: undefined,
          phoneNumber: undefined,
          region: undefined,
          state: undefined
        },
        loading: false,
        filters: {
          cname: undefined,
          region: undefined
        }
      }
    },
    methods: {
      init: function(){
        this.queryUsers();
      },

      queryUsers: async function() {
        this.loading = true;
        let res = await fetchUsers({
            pageNum: this.pagination.current,
            pageSize: this.pagination.pageSize
        });
        this.loading = false;
        this.users = res?.records;

        this.pagination = {
            ...this.pagination,
            total: res?.total,
        };
      },

      // 换页刷新
      setCurrentPage: function (value) {
          // console.log(value);
        this.pagination = {
            ...this.pagination,
            current: value.current,
            pageSize: value.pageSize
        };
        this.queryUsers();
      },

      reset: function() {

      },

      addUser: function() {
          debugger;
        this.openModal(true, {
          isUpdate: false,
        });
        // this.dialogVisible = true;
        // this.isEdit = false;
        // this.form = {
        //   id: undefined,
        //   userName: undefined,
        //   password: undefined,
        //   cname: undefined,
        //   sex: undefined,
        //   phoneNumber: undefined,
        //   state: undefined
        // }
      },

      getActions: function (record) {
        return [
          {
            label: '编辑',
            onClick: handleEdit.bind(null, record),
          },
          {
            label: '删除',
            popConfirm: {
                title: '是否确认删除',
                placement: 'left',
                confirm: handleDelete.bind(null, record),
            },
          }
        ];
      },

      handleEdit: function(value) {
          this.openModal(true, {
              isUpdate: true,
          });
      },
      handleDelete: function(value) {
        let param = value;
        //call delete api
      },
      submitForm: async function() {
        let param = {
          ...this.form,
          password: md5('NEU_tj_' + this.form.password)
        }
        console.log(param);

        if (!this.isEdit) {
          let res = await createUser(param);
          if (res) {
            this.queryUsers();
          }
        } else {
          let res = await editUser(param);
          if (res) {
            this.queryUsers();
          }
        }

        this.dialogVisible = false;

      }
    },
    mounted() {
      this.init();
    },
  }

</script>

<style lang="scss" scoped>
</style>
