export interface Category {
  id: string
  name: string
  user_id: string
  created_at: string
}

export interface Entry {
  id: string
  title: string
  content: string
  category_id: string | null
  user_id: string
  created_at: string
  category?: Category
}

export interface TreeNode {
  id: string
  label: string
  type: "user" | "category" | "entry"
  children?: TreeNode[]
  parentId?: string
}
