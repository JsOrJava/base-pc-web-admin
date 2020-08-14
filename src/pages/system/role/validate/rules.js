const rules = {
    name: [
        { required: true, message: '角色名称不能为空', trigger: 'blur' },
        { min: 1, max: 8, message: '角色名称最多8个字', trigger: 'blur' }
    ],
    privilege: [
        { required: true, message: '权限不能为空', trigger: 'visible-change' }
    ]
}

export default rules