import { describe, it, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import BasicPagination from '../BasicPagination.vue'

describe('BasicPagination', () => {
  test.each`
    pageCount | expected
    ${0}      | ${false}
    ${1}      | ${false}
    ${2}      | ${true}
  `('If pageCount = $pageCount, then pagination component is rendered = $expected', ({ pageCount, expected }) => {
    const wrapper = mount(BasicPagination, {
      props: {
        pageCount: pageCount
      }
    })
    expect(wrapper.find('.vue3-basic-pagination').exists()).toBe(expected)
  })

  it('If pageCount > 1 render item with .active-item class', async () => {
    const wrapper = mount(BasicPagination, {
      props: {
        pageCount: 2
      }
    })
    expect(wrapper.find('.active-item').exists()).toBe(true)
  })

  it('If pageCount > 1 and showFirstLastButtons = true, .first-item should have .disabled-item class', async () => {
    const wrapper = mount(BasicPagination, {
      props: {
        pageCount: 2
      }
    })
    expect(wrapper.find('.first-item.disabled-item').exists()).toBe(true)
  })

  it('If pageCount > 1 and showFirstLastButtons = true - render .first-item, .first-link, last-item, last-link classes', async () => {
    const wrapper = mount(BasicPagination, {
      props: {
        pageCount: 2,
        showFirstLastButtons: true
      }
    })
    expect(wrapper.find('.first-item').exists()).toBe(true)
    expect(wrapper.find('.first-link').exists()).toBe(true)
    expect(wrapper.find('.last-item').exists()).toBe(true)
    expect(wrapper.find('.last-link').exists()).toBe(true)
  })

  it('If pageCount > 1 and showFirstLastButtons = false - do not render .first-item, .first-link, last-item, last-link classes', async () => {
    const wrapper = mount(BasicPagination, {
      props: {
        pageCount: 2,
        showFirstLastButtons: false
      }
    })
    expect(wrapper.find('.first-item').exists()).toBe(false)
    expect(wrapper.find('.first-link').exists()).toBe(false)
    expect(wrapper.find('.last-link').exists()).toBe(false)
    expect(wrapper.find('.last-link').exists()).toBe(false)
  })

  it('If pageCount > 1 and showPrevNextButtons = false - do not render .prev-item and .next-item classes', async () => {
    const wrapper = mount(BasicPagination, {
      props: {
        pageCount: 2,
        showPrevNextButtons: false
      }
    })
    expect(wrapper.find('.prev-item').exists()).toBe(false)
    expect(wrapper.find('.next-item').exists()).toBe(false)
  })

  it('If pageCount > 1 and showPrevNextButtons = true - render .prev-item and next-item classes', async () => {
    const wrapper = mount(BasicPagination, {
      props: {
        pageCount: 2,
        showPrevNextButtons: true
      }
    })
    expect(wrapper.find('.prev-item').exists()).toBe(true)
    expect(wrapper.find('.next-item').exists()).toBe(true)
  })

  it('If pageCount >= 9 and selectedPage = 5 - render element with .break-item class', async () => {
    const wrapper = mount(BasicPagination, {
      props: {
        pageCount: 9,
        selectedPage: 1
      }
    })
    expect(wrapper.findAll('.break-item').length).toBe(1)
    expect(wrapper.find('.break-item').text().includes('…')).toBe(true)
  })

  it('If pageCount >= 9 and selectedPage = 5 - render two elements with .break-item class', async () => {
    const wrapper = mount(BasicPagination, {
      props: {
        pageCount: 9,
        selectedPage: 5
      }
    })
    expect(wrapper.findAll('.break-item').length).toBe(2)
  })
})
