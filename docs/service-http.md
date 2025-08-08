# HTTP Service

The HTTP service created in `app/services/http/` for API integration and server state management.

---

## Table of Contents

- [Quick Start](#quick-start)
- [REST Client Usage](#rest-client-usage)
- [GraphQL Client Usage](#graphql-client-usage)
- [React Integration Patterns](#react-integration-patterns)
- [Caching Strategy](#caching-strategy)
- [Server-Side Usage](#server-side-usage)
- [Error Handling](#error-handling)
- [Caching & Performance](#caching--performance)
- [Configuration](#configuration)
- [Advanced Usage](#advanced-usage)
- [Testing Patterns](#testing-patterns)
- [Service Architecture](#service-architecture)
- [Related Documentation](#related-documentation)

---

## Quick Start

### Import the Clients

```typescript
import { restClient } from '@/app/services/http/rest'
import { graphqlClient } from '@/app/services/http/graphql'
```

### Basic REST Usage

```typescript
// GET request
const users = await restClient.get<User[]>('/users')

// POST request
const newUser = await restClient.post<User>('/users', {
  name: 'John Doe',
  email: 'john@example.com',
})

// PUT request
const updatedUser = await restClient.put<User>('/users/123', {
  name: 'John Smith',
  email: 'john.smith@example.com',
})

// DELETE request
await restClient.delete('/users/123')
```

### Basic GraphQL Usage

```typescript
// Query
const result = await graphqlClient.query<UsersResponse>`
  query GetUsers($limit: Int!) {
    users(limit: $limit) {
      id
      name
      email
    }
  }
`, { limit: 10 }

// Mutation
const createResult = await graphqlClient.mutation<CreateUserResponse>`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
      email
    }
  }
`, {
  input: {
    name: 'Jane Doe',
    email: 'jane@example.com'
  }
}
```

---

## REST Client Usage

### Available Methods

```typescript
// GET - Fetch data
restClient.get<ResponseType>(path, options?)

// POST - Create resources
restClient.post<ResponseType>(path, body?, options?)

// PUT - Update resources (full replacement)
restClient.put<ResponseType>(path, body?, options?)

// PATCH - Update resources (partial)
restClient.patch<ResponseType>(path, body?, options?)

// DELETE - Remove resources
restClient.delete<ResponseType>(path, options?)
```

### Practical Examples

**Fetch User Profile:**

```typescript
interface User {
  id: string
  name: string
  email: string
  avatar: string
}

const fetchUserProfile = async (userId: string): Promise<User> => {
  return restClient.get<User>(`/users/${userId}`)
}
```

**Create New Post:**

```typescript
interface CreatePostRequest {
  title: string
  content: string
  tags: string[]
}

interface Post {
  id: string
  title: string
  content: string
  tags: string[]
  createdAt: string
}

const createPost = async (postData: CreatePostRequest): Promise<Post> => {
  return restClient.post<Post>('/posts', postData)
}
```

**Update User Settings:**

```typescript
interface UserSettings {
  theme: 'light' | 'dark'
  notifications: boolean
  language: string
}

const updateSettings = async (
  userId: string,
  settings: Partial<UserSettings>,
): Promise<UserSettings> => {
  return restClient.patch<UserSettings>(`/users/${userId}/settings`, settings)
}
```

### Request Options

```typescript
// With custom headers
const response = await restClient.get<User[]>('/users', {
  headers: {
    Authorization: 'Bearer token',
    'X-Custom-Header': 'value',
  },
})

// With timeout
const response = await restClient.get<User[]>('/users', {
  timeout: 5000, // 5 seconds
})

// With cache tags (Next.js)
const response = await restClient.get<User[]>('/users', {
  tags: ['users'],
  revalidate: 300, // 5 minutes
})
```

---

## GraphQL Client Usage

### Available Methods

```typescript
// Query - Fetch data
graphqlClient.query<ResponseType>(query, variables?, options?)

// Mutation - Modify data
graphqlClient.mutation<ResponseType>(mutation, variables?, options?)

// Subscription - Real-time data
graphqlClient.subscription<ResponseType>(subscription, variables?, options?)
```

### Practical Examples

**Fetch Posts with Comments:**

```typescript
interface PostsResponse {
  posts: {
    id: string
    title: string
    content: string
    comments: {
      id: string
      text: string
      author: string
    }[]
  }[]
}

const fetchPosts = async (): Promise<PostsResponse> => {
  return graphqlClient.query<PostsResponse>`
    query GetPosts {
      posts {
        id
        title
        content
        comments {
          id
          text
          author
        }
      }
    }
  `
}
```

**Create User with Validation:**

```typescript
interface CreateUserInput {
  name: string
  email: string
  role: 'USER' | 'ADMIN'
}

interface CreateUserResponse {
  createUser: {
    id: string
    name: string
    email: string
    errors?: string[]
  }
}

const createUser = async (
  input: CreateUserInput,
): Promise<CreateUserResponse> => {
  return (
    graphqlClient.mutation<CreateUserResponse>`
    mutation CreateUser($input: CreateUserInput!) {
      createUser(input: $input) {
        id
        name
        email
        errors
      }
    }
  `,
    { input }
  )
}
```

**Real-time Notifications:**

```typescript
interface NotificationSubscription {
  notificationAdded: {
    id: string
    message: string
    type: 'INFO' | 'WARNING' | 'ERROR'
    timestamp: string
  }
}

const subscribeToNotifications = async (userId: string) => {
  return (
    graphqlClient.subscription<NotificationSubscription>`
    subscription NotificationAdded($userId: ID!) {
      notificationAdded(userId: $userId) {
        id
        message
        type
        timestamp
      }
    }
  `,
    { userId }
  )
}
```

---

## React Integration Patterns

### Custom Query Hooks

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { restClient } from '@/app/services/http/rest'

// Fetch users hook
export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => restClient.get<User[]>('/users'),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Fetch single user hook
export const useUser = (userId: string) => {
  return useQuery({
    queryKey: ['users', userId],
    queryFn: () => restClient.get<User>(`/users/${userId}`),
    enabled: !!userId,
  })
}

// Create user mutation
export const useCreateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (userData: CreateUserRequest) =>
      restClient.post<User>('/users', userData),
    onSuccess: () => {
      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}
```

### Component Usage

```typescript
import { useUsers, useCreateUser } from '@/app/hooks/use-users'

const UsersList = () => {
  const { data: users, isLoading, error } = useUsers()
  const createUser = useCreateUser()

  const handleCreateUser = async (userData: CreateUserRequest) => {
    try {
      await createUser.mutateAsync(userData)
      // User created and list automatically updated
    } catch (error) {
      console.error('Failed to create user:', error)
    }
  }

  if (isLoading) return <div>Loading users...</div>
  if (error) return <div>Error loading users</div>

  return (
    <div>
      {users?.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  )
}
```

### GraphQL Hooks

```typescript
import { useQuery } from '@tanstack/react-query'
import { graphqlClient } from '@/app/services/http/graphql'

// GraphQL query hook
export const usePosts = (limit: number = 10) => {
  return useQuery({
    queryKey: ['posts', limit],
    queryFn: () => graphqlClient.query<PostsResponse>`
      query GetPosts($limit: Int!) {
        posts(limit: $limit) {
          id
          title
          content
          author {
            name
            avatar
          }
        }
      }
    `, { limit }
  })
}

// Component usage
const PostsList = () => {
  const { data, isLoading } = usePosts(20)

  if (isLoading) return <div>Loading posts...</div>

  return (
    <div>
      {data?.posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </article>
      ))}
    </div>
  )
}
```

---

## Caching Strategy ✅

The HTTP service implements multi-layered caching that coordinates between browser, memory, and server caches for optimal performance.

### Cache Layer Coordination

| Layer              | Purpose                   | When to Use                   | Implementation Status |
| ------------------ | ------------------------- | ----------------------------- | --------------------- |
| **Browser Cache**  | Static assets, HTTP cache | Always (automatic)            | ✅ Next.js configured |
| **TanStack Query** | In-memory server state    | Client-side data fetching     | ✅ Provider ready     |
| **Next.js Cache**  | Server-side data & ISR    | Server components, API routes | ✅ Fetch integration  |
| **Network Cache**  | CDN, proxy cache          | Public, cacheable content     | 🚀 Headers ready      |

### Choosing Cache Strategies

**Long-term Static Data (24h+):**

```typescript
// Countries, settings, rarely changing content
const countries = await restClient.get<Country[]>('/countries', {
  tags: ['countries'],
  revalidate: 86400, // 24 hours
})
```

**Medium-term Dynamic Data (5-30min):**

```typescript
// User profiles, posts, moderately changing content
const posts = await restClient.get<Post[]>('/posts', {
  tags: ['posts'],
  revalidate: 300, // 5 minutes
})
```

**Short-term Real-time Data (30s-2min):**

```typescript
// Notifications, live counters, frequently changing content
const notifications = await restClient.get<Notification[]>('/notifications', {
  tags: ['notifications'],
  revalidate: 60, // 1 minute
})
```

**No Cache (Always Fresh):**

```typescript
// Authentication checks, real-time data, user-specific content
const currentUser = await restClient.get<User>('/me', {
  revalidate: false, // Always fresh
})
```

### Cache Coordination Benefits

- **Automatic Deduplication**: Multiple requests to same endpoint are merged
- **Background Updates**: Stale data served while fresh data loads
- **Cache Invalidation**: Coordinated across all layers using tags
- **Optimistic Updates**: UI updates immediately, syncs in background

### Cache Invalidation Patterns

```typescript
// Manual cache invalidation
import { revalidateTag } from 'next/cache'

// After creating new post
await restClient.post<Post>('/posts', postData)
revalidateTag('posts') // Invalidate posts cache

// TanStack Query invalidation
queryClient.invalidateQueries({ queryKey: ['posts'] })
```

Learn more: [Next.js Caching](https://nextjs.org/docs/app/building-your-application/caching) | [TanStack Query Caching](https://tanstack.com/query/latest/docs/framework/react/guides/caching)

---

## Server-Side Usage

### In Route Handlers

```typescript
// app/api/users/route.ts
import { restClient } from '@/app/services/http/rest'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const users = await restClient.get<User[]>('/users', {
      // Server-side caching
      tags: ['users'],
      revalidate: 300,
    })

    return NextResponse.json(users)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 },
    )
  }
}
```

### In Server Components

```typescript
// app/(routes)/users/page.tsx
import { restClient } from '@/app/services/http/rest'
import UsersList from './components/users-list'

const UsersPage = async () => {
  // Fetch data server-side for SEO
  const users = await restClient.get<User[]>('/users', {
    tags: ['users'],
    revalidate: 300
  })

  return (
    <div>
      <h1>Users</h1>
      <UsersList initialData={users} />
    </div>
  )
}

export default UsersPage
```

### In Server Actions

```typescript
// app/actions/user-actions.ts
'use server'

import { restClient } from '@/app/services/http/rest'
import { revalidateTag } from 'next/cache'

export async function createUserAction(formData: FormData) {
  const userData = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
  }

  try {
    const newUser = await restClient.post<User>('/users', userData)

    // Revalidate cache
    revalidateTag('users')

    return { success: true, user: newUser }
  } catch (error) {
    return { success: false, error: 'Failed to create user' }
  }
}
```

---

## Error Handling

### Try-Catch Pattern

```typescript
const fetchUserSafely = async (userId: string) => {
  try {
    const user = await restClient.get<User>(`/users/${userId}`)
    return { data: user, error: null }
  } catch (error) {
    if (error instanceof Error) {
      return { data: null, error: error.message }
    }
    return { data: null, error: 'Unknown error occurred' }
  }
}
```

### Error Response Structure

```typescript
interface HttpError {
  message: string
  status: number
  code?: string
  details?: Record<string, unknown>
}

// Usage with specific error handling
const handleUserCreation = async (userData: CreateUserRequest) => {
  try {
    return await restClient.post<User>('/users', userData)
  } catch (error) {
    const httpError = error as HttpError

    switch (httpError.status) {
      case 400:
        throw new Error('Invalid user data provided')
      case 409:
        throw new Error('User with this email already exists')
      case 500:
        throw new Error('Server error, please try again later')
      default:
        throw new Error('Failed to create user')
    }
  }
}
```

### React Query Error Handling

```typescript
export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => restClient.get<User[]>('/users'),
    retry: (failureCount, error) => {
      const httpError = error as HttpError
      // Don't retry on 4xx errors
      if (httpError.status >= 400 && httpError.status < 500) {
        return false
      }
      return failureCount < 2
    },
    throwOnError: (error) => {
      const httpError = error as HttpError
      // Only throw on critical errors
      return httpError.status >= 500
    },
  })
}
```

---

## Caching & Performance

### Cache Configuration

```typescript
// Long-term cache for rarely changing data
const countries = await restClient.get<Country[]>('/countries', {
  tags: ['countries'],
  revalidate: 86400, // 24 hours
})

// Short-term cache for frequently changing data
const notifications = await restClient.get<Notification[]>('/notifications', {
  tags: ['notifications'],
  revalidate: 60, // 1 minute
})

// No cache for real-time data
const liveData = await restClient.get<LiveData>('/live-data', {
  revalidate: false, // Always fresh
})
```

### Request Deduplication

```typescript
// Multiple calls to the same endpoint are automatically deduplicated
const [users1, users2, users3] = await Promise.all([
  restClient.get<User[]>('/users'),
  restClient.get<User[]>('/users'),
  restClient.get<User[]>('/users'),
])
// Only one actual HTTP request is made
```

### AbortController Integration

```typescript
const controller = new AbortController()

// Cancel request after 5 seconds
setTimeout(() => controller.abort(), 5000)

try {
  const users = await restClient.get<User[]>('/users', {
    signal: controller.signal,
  })
} catch (error) {
  if (error.name === 'AbortError') {
    console.log('Request was cancelled')
  }
}
```

---

## Configuration

### Environment Variables

```bash
# .env.local
NEXT_PUBLIC_API_URL=https://api.example.com
```

### Custom Base URL per Request

```typescript
// Use different API for specific requests
const externalData = await restClient.get<ExternalData>('/data', {
  baseUrl: 'https://external-api.com',
})
```

### Custom Headers

```typescript
// Global authentication
const authenticatedClient = {
  get: (path: string, options = {}) =>
    restClient.get(path, {
      ...options,
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
        ...options.headers,
      },
    }),
}
```

---

## Advanced Usage

### Request Interceptors

```typescript
// Create wrapper for automatic authentication
const createAuthenticatedRequest = <T>(
  requestFn: () => Promise<T>,
): Promise<T> => {
  return requestFn().catch(async (error) => {
    if (error.status === 401) {
      await refreshAuthToken()
      return requestFn() // Retry with new token
    }
    throw error
  })
}

// Usage
const getProtectedData = () =>
  createAuthenticatedRequest(() =>
    restClient.get<ProtectedData>('/protected-data'),
  )
```

### Pagination Helper

```typescript
interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    totalPages: number
    totalCount: number
  }
}

const fetchPaginatedUsers = async (page: number = 1, limit: number = 10) => {
  return restClient.get<PaginatedResponse<User>>(
    `/users?page=${page}&limit=${limit}`,
  )
}

// Infinite query hook
export const useInfiniteUsers = () => {
  return useInfiniteQuery({
    queryKey: ['users'],
    queryFn: ({ pageParam = 1 }) => fetchPaginatedUsers(pageParam),
    getNextPageParam: (lastPage) => {
      return lastPage.pagination.page < lastPage.pagination.totalPages
        ? lastPage.pagination.page + 1
        : undefined
    },
  })
}
```

### File Upload

```typescript
const uploadFile = async (file: File): Promise<UploadResponse> => {
  const formData = new FormData()
  formData.append('file', file)

  return restClient.post<UploadResponse>('/upload', formData, {
    headers: {
      // Don't set Content-Type, let browser set it with boundary
    },
    timeout: 30000, // 30 seconds for file uploads
  })
}
```

---

## Testing Patterns ✅

Comprehensive testing strategies for code that uses the HTTP service.

### Mocking the HTTP Service

**Basic Service Mocking:**

```typescript
// __mocks__/http-service.ts
export const mockRestClient = {
  get: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  patch: vi.fn(),
  delete: vi.fn(),
}

export const mockGraphqlClient = {
  query: vi.fn(),
  mutation: vi.fn(),
  subscription: vi.fn(),
}

// Mock the modules
vi.mock('@/app/services/http/rest', () => ({
  restClient: mockRestClient,
}))

vi.mock('@/app/services/http/graphql', () => ({
  graphqlClient: mockGraphqlClient,
}))
```

### Testing Service Functions

**Testing Data Fetching Functions:**

```typescript
// user-service.ts
import { restClient } from '@/app/services/http/rest'

export const fetchUser = async (id: string): Promise<User> => {
  return restClient.get<User>(`/users/${id}`)
}

export const createUser = async (
  userData: CreateUserRequest,
): Promise<User> => {
  return restClient.post<User>('/users', userData)
}

// user-service.test.ts
import { describe, it, expect, vi } from 'vitest'
import { mockRestClient } from '__mocks__/http-service'
import { fetchUser, createUser } from './user-service'

describe('User Service', () => {
  it('should fetch user by id', async () => {
    const mockUser = { id: '1', name: 'John Doe', email: 'john@example.com' }
    mockRestClient.get.mockResolvedValue(mockUser)

    const result = await fetchUser('1')

    expect(mockRestClient.get).toHaveBeenCalledWith('/users/1')
    expect(result).toEqual(mockUser)
  })

  it('should create new user', async () => {
    const userData = { name: 'Jane Doe', email: 'jane@example.com' }
    const mockUser = { id: '2', ...userData }
    mockRestClient.post.mockResolvedValue(mockUser)

    const result = await createUser(userData)

    expect(mockRestClient.post).toHaveBeenCalledWith('/users', userData)
    expect(result).toEqual(mockUser)
  })
})
```

### Testing React Query Hooks

**Testing Custom Hooks:**

```typescript
// use-users.test.tsx
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { describe, it, expect, vi } from 'vitest'
import { mockRestClient } from '__mocks__/http-service'
import { useUsers, useCreateUser } from './use-users'

// Test wrapper with QueryClient
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

describe('useUsers', () => {
  it('should fetch users successfully', async () => {
    const mockUsers = [
      { id: '1', name: 'John Doe' },
      { id: '2', name: 'Jane Doe' }
    ]
    mockRestClient.get.mockResolvedValue(mockUsers)

    const { result } = renderHook(() => useUsers(), {
      wrapper: createWrapper()
    })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(result.current.data).toEqual(mockUsers)
    expect(mockRestClient.get).toHaveBeenCalledWith('/users')
  })

  it('should handle fetch error', async () => {
    const error = new Error('Failed to fetch users')
    mockRestClient.get.mockRejectedValue(error)

    const { result } = renderHook(() => useUsers(), {
      wrapper: createWrapper()
    })

    await waitFor(() => {
      expect(result.current.isError).toBe(true)
    })

    expect(result.current.error).toEqual(error)
  })
})

describe('useCreateUser', () => {
  it('should create user successfully', async () => {
    const userData = { name: 'New User', email: 'new@example.com' }
    const mockUser = { id: '3', ...userData }
    mockRestClient.post.mockResolvedValue(mockUser)

    const { result } = renderHook(() => useCreateUser(), {
      wrapper: createWrapper()
    })

    await result.current.mutateAsync(userData)

    expect(mockRestClient.post).toHaveBeenCalledWith('/users', userData)
  })
})
```

### Testing Components with HTTP Service

**Testing Components that use HTTP hooks:**

```typescript
// UsersList.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { describe, it, expect, vi } from 'vitest'
import { mockRestClient } from '__mocks__/http-service'
import UsersList from './UsersList'

const renderWithQueryClient = (component: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })

  return render(
    <QueryClientProvider client={queryClient}>
      {component}
    </QueryClientProvider>
  )
}

describe('UsersList', () => {
  it('should display users when loaded', async () => {
    const mockUsers = [
      { id: '1', name: 'John Doe', email: 'john@example.com' },
      { id: '2', name: 'Jane Doe', email: 'jane@example.com' }
    ]
    mockRestClient.get.mockResolvedValue(mockUsers)

    renderWithQueryClient(<UsersList />)

    expect(screen.getByText('Loading users...')).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument()
      expect(screen.getByText('Jane Doe')).toBeInTheDocument()
    })
  })

  it('should display error message when fetch fails', async () => {
    mockRestClient.get.mockRejectedValue(new Error('Failed to fetch'))

    renderWithQueryClient(<UsersList />)

    await waitFor(() => {
      expect(screen.getByText('Error loading users')).toBeInTheDocument()
    })
  })

  it('should create user when form is submitted', async () => {
    const mockUsers = []
    const newUser = { id: '1', name: 'New User', email: 'new@example.com' }

    mockRestClient.get.mockResolvedValue(mockUsers)
    mockRestClient.post.mockResolvedValue(newUser)

    renderWithQueryClient(<UsersList />)

    // Wait for initial load
    await waitFor(() => {
      expect(screen.queryByText('Loading users...')).not.toBeInTheDocument()
    })

    // Fill and submit form
    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'New User' }
    })
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'new@example.com' }
    })
    fireEvent.click(screen.getByText('Create User'))

    await waitFor(() => {
      expect(mockRestClient.post).toHaveBeenCalledWith('/users', {
        name: 'New User',
        email: 'new@example.com'
      })
    })
  })
})
```

### Testing Error Handling

**Testing Error Scenarios:**

```typescript
// error-handling.test.ts
import { describe, it, expect, vi } from 'vitest'
import { mockRestClient } from '__mocks__/http-service'
import { fetchUserSafely } from './user-service'

describe('Error Handling', () => {
  it('should handle 404 errors gracefully', async () => {
    const error = { status: 404, message: 'User not found' }
    mockRestClient.get.mockRejectedValue(error)

    const result = await fetchUserSafely('nonexistent')

    expect(result).toEqual({
      data: null,
      error: 'User not found',
    })
  })

  it('should handle network errors', async () => {
    const error = new Error('Network error')
    mockRestClient.get.mockRejectedValue(error)

    const result = await fetchUserSafely('123')

    expect(result).toEqual({
      data: null,
      error: 'Network error',
    })
  })

  it('should handle timeout errors', async () => {
    const error = { name: 'AbortError', message: 'Request timeout' }
    mockRestClient.get.mockRejectedValue(error)

    const result = await fetchUserSafely('123')

    expect(result).toEqual({
      data: null,
      error: 'Request timeout',
    })
  })
})
```

### Testing GraphQL Operations

**Testing GraphQL Queries and Mutations:**

```typescript
// graphql-service.test.ts
import { describe, it, expect, vi } from 'vitest'
import { mockGraphqlClient } from '__mocks__/http-service'
import { fetchPosts, createPost } from './post-service'

describe('GraphQL Service', () => {
  it('should fetch posts with GraphQL query', async () => {
    const mockResponse = {
      posts: [
        { id: '1', title: 'Post 1', content: 'Content 1' },
        { id: '2', title: 'Post 2', content: 'Content 2' },
      ],
    }
    mockGraphqlClient.query.mockResolvedValue(mockResponse)

    const result = await fetchPosts()

    expect(mockGraphqlClient.query).toHaveBeenCalledWith(
      expect.stringContaining('query GetPosts'),
      undefined,
    )
    expect(result).toEqual(mockResponse)
  })

  it('should create post with GraphQL mutation', async () => {
    const postData = { title: 'New Post', content: 'New Content' }
    const mockResponse = {
      createPost: { id: '3', ...postData },
    }
    mockGraphqlClient.mutation.mockResolvedValue(mockResponse)

    const result = await createPost(postData)

    expect(mockGraphqlClient.mutation).toHaveBeenCalledWith(
      expect.stringContaining('mutation CreatePost'),
      { input: postData },
    )
    expect(result).toEqual(mockResponse)
  })
})
```

### Testing Cache Invalidation

**Testing Cache Updates:**

```typescript
// cache-invalidation.test.ts
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { describe, it, expect, vi } from 'vitest'
import { mockRestClient } from '__mocks__/http-service'
import { useUsers, useCreateUser } from './use-users'

describe('Cache Invalidation', () => {
  it('should invalidate users cache after creating user', async () => {
    const initialUsers = [{ id: '1', name: 'John' }]
    const newUser = { id: '2', name: 'Jane' }
    const updatedUsers = [...initialUsers, newUser]

    // Setup QueryClient with spy
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false }, mutations: { retry: false } }
    })
    const invalidateQueriesSpy = vi.spyOn(queryClient, 'invalidateQueries')

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    )

    // Mock API responses
    mockRestClient.get
      .mockResolvedValueOnce(initialUsers)  // Initial fetch
      .mockResolvedValueOnce(updatedUsers)  // After invalidation
    mockRestClient.post.mockResolvedValue(newUser)

    // Render hooks
    const { result: usersResult } = renderHook(() => useUsers(), { wrapper })
    const { result: createResult } = renderHook(() => useCreateUser(), { wrapper })

    // Wait for initial data
    await waitFor(() => {
      expect(usersResult.current.isSuccess).toBe(true)
    })
    expect(usersResult.current.data).toEqual(initialUsers)

    // Create new user
    await createResult.current.mutateAsync({
      name: 'Jane',
      email: 'jane@example.com'
    })

    // Verify cache invalidation was called
    expect(invalidateQueriesSpy).toHaveBeenCalledWith({
      queryKey: ['users']
    })
  })
})
```

### Testing Utilities & Helpers

**Custom Test Utilities:**

```typescript
// test-utils.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, RenderOptions } from '@testing-library/react'

// Create test query client
export const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      cacheTime: 0,
      staleTime: 0,
    },
    mutations: {
      retry: false,
    },
  },
})

// Custom render with providers
export const renderWithProviders = (
  ui: React.ReactElement,
  options?: RenderOptions & { queryClient?: QueryClient }
) => {
  const { queryClient = createTestQueryClient(), ...renderOptions } = options || {}

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )

  return render(ui, { wrapper: Wrapper, ...renderOptions })
}

// HTTP Service mock helpers
export const mockRestClientSuccess = (data: unknown) => {
  mockRestClient.get.mockResolvedValue(data)
  mockRestClient.post.mockResolvedValue(data)
  mockRestClient.put.mockResolvedValue(data)
  mockRestClient.patch.mockResolvedValue(data)
  mockRestClient.delete.mockResolvedValue(data)
}

export const mockRestClientError = (error: unknown) => {
  mockRestClient.get.mockRejectedValue(error)
  mockRestClient.post.mockRejectedValue(error)
  mockRestClient.put.mockRejectedValue(error)
  mockRestClient.patch.mockRejectedValue(error)
  mockRestClient.delete.mockRejectedValue(error)
}
```

### Best Practices

**Testing Guidelines:**

- **Mock at service boundaries** - mock restClient/graphqlClient, not fetch
- **Test behavior, not implementation** - focus on what the user sees
- **Use realistic test data** - match your actual API responses
- **Test error scenarios** - network errors, validation errors, timeouts
- **Test cache invalidation** - ensure UI updates after mutations
- **Keep tests isolated** - each test should be independent

**Performance Tips:**

- **Disable retries** in test QueryClient to speed up tests
- **Use `vi.clearAllMocks()`** in beforeEach to reset state
- **Mock heavy operations** like file uploads or complex calculations
- **Use `waitFor`** instead of arbitrary timeouts

Learn more: [Vitest](https://vitest.dev/guide/) | [Testing Library](https://testing-library.com/docs/) | [TanStack Query Testing](https://tanstack.com/query/latest/docs/framework/react/guides/testing)

---

## Service Architecture

### Implementation Details

The HTTP service uses an adapter pattern with the following layers:

- **Application Layer**: React components and hooks
- **Service Layer**: REST and GraphQL clients with unified interfaces
- **Adapter Layer**: Fetch-based adapters for actual HTTP communication
- **Transport Layer**: Native Fetch API

### Key Features

- **Type Safety**: Full TypeScript integration throughout
- **Caching**: Multi-layer caching with Next.js and TanStack Query
- **Error Handling**: Standardized error processing and recovery
- **Performance**: Request deduplication, timeouts, and cancellation
- **Testing**: Comprehensive test coverage with mocking patterns

---

## Related Documentation

- **[← Back to README](../README.md)** - technology stack and development overview
- **[Getting Started](getting-started.md)** - setup requirements and installation
- **[Architecture](architecture.md)** - project structure and patterns
- **[Development](development.md)** - development workflow, quality tools, and testing
- **[Browser Support](browser-support.md)** - compatibility requirements

---

_Ready to implement? Check the test files for more examples:_

- `app/services/http/rest/rest.test.ts`
- `app/services/http/graphql/graphql.test.ts`
