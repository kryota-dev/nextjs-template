import { CommentList } from './CommentList'

import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta: Meta<typeof CommentList> = {
  title: 'components/common/CommentList',
  component: CommentList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof CommentList>

const mockComments = [
  {
    id: 1,
    postId: 1,
    name: 'id labore ex et quam laborum',
    email: 'Eliseo@gardner.biz',
    body: 'laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium',
  },
  {
    id: 2,
    postId: 1,
    name: 'quo vero reiciendis velit similique earum',
    email: 'Jayne_Kuhic@sydney.com',
    body: 'est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et',
  },
  {
    id: 3,
    postId: 1,
    name: 'odio adipisci rerum aut animi',
    email: 'Nikita@garfield.biz',
    body: 'quia molestiae reprehenderit quasi aspernatur\naut expedita occaecati aliquam eveniet laudantium\nomnis quibusdam delectus saepe quia accusamus maiores nam est\ncum et ducimus et vero voluptates excepturi deleniti ratione',
  },
]

export const Default: Story = {
  args: {
    comments: mockComments,
  },
}

export const Empty: Story = {
  args: {
    comments: [],
  },
}

export const SingleComment: Story = {
  args: {
    comments: [mockComments[0]],
  },
}

export const ManyComments: Story = {
  args: {
    comments: [
      ...mockComments,
      {
        id: 4,
        postId: 1,
        name: 'alias odio sit',
        email: 'Lew@alysha.tv',
        body: 'non et atque\noccaecati deserunt quas accusantium unde odit nobis qui voluptatem\nquia voluptas consequuntur itaque dolor\net qui rerum deleniti ut occaecati',
      },
      {
        id: 5,
        postId: 1,
        name: 'vero eaque aliquid doloribus et culpa',
        email: 'Hayden@althea.biz',
        body: 'harum non quasi et ratione\ntempore iure ex voluptates in ratione\nharum architecto fugit inventore cupiditate\nvoluptates magni quo et',
      },
    ],
  },
}
