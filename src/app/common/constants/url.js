import {BASE_API_PATH} from '../../constants'

export default {
    project_list: BASE_API_PATH + 'project/list',
    banner: 'html/mobile_banner/show/index.html',
    news: BASE_API_PATH +'article/list?category=1233&pageSize=1&currPage=1',
    project_list_2: BASE_API_PATH + 'project/list?status=融资中',
    ads: BASE_API_PATH + 'slide/list'
}
