import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as integer. Type represents date and time as number of milliseconds from start of UNIX epoch. */
  Timestamp: any;
};

export type Query = {
  __typename?: 'Query';
  categories: Array<Category>;
  categoryById?: Maybe<Category>;
  hello: Scalars['String'];
  projects: Array<Project>;
  me?: Maybe<User>;
  isAdmin: Scalars['Boolean'];
};


export type QueryCategoryByIdArgs = {
  id: Scalars['Float'];
};


export type QueryProjectsArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Float'];
  category?: Maybe<Scalars['Int']>;
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['Float'];
  name: Scalars['String'];
  projects: Array<Project>;
};

export type Project = {
  __typename?: 'Project';
  id: Scalars['Float'];
  title: Scalars['String'];
  text: Scalars['String'];
  authorId: Scalars['Float'];
  categoryId: Scalars['Float'];
  tags: Scalars['String'];
  createdAt: Scalars['Timestamp'];
  updatedAt: Scalars['Timestamp'];
};


export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  username: Scalars['String'];
  email: Scalars['String'];
  projects: Array<Project>;
  createdAt: Scalars['Timestamp'];
  updatedAt: Scalars['Timestamp'];
};

export type Mutation = {
  __typename?: 'Mutation';
  adminCreateCategory: Category;
  createProject: ProjectResponse;
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  changeAdminStatus: Scalars['Boolean'];
};


export type MutationAdminCreateCategoryArgs = {
  name: Scalars['String'];
};


export type MutationCreateProjectArgs = {
  input: ProjectInput;
};


export type MutationRegisterArgs = {
  options: RegistrationInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationChangeAdminStatusArgs = {
  isAdmin: Scalars['Boolean'];
  userId: Scalars['Float'];
};

export type ProjectResponse = {
  __typename?: 'ProjectResponse';
  errors?: Maybe<Array<FieldError>>;
  project?: Maybe<Project>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type ProjectInput = {
  title: Scalars['String'];
  text: Scalars['String'];
  categoryId: Scalars['Float'];
  tags: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type RegistrationInput = {
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
};

export type UserFragmentFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username'>
);

export type CreateProjectMutationVariables = Exact<{
  title: Scalars['String'];
  text: Scalars['String'];
  categoryId: Scalars['Float'];
  tags: Scalars['String'];
}>;


export type CreateProjectMutation = (
  { __typename?: 'Mutation' }
  & { createProject: (
    { __typename?: 'ProjectResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, project?: Maybe<(
      { __typename?: 'Project' }
      & Pick<Project, 'id'>
    )> }
  ) }
);

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & UserFragmentFragment
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  options: RegistrationInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & UserFragmentFragment
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type CategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type CategoriesQuery = (
  { __typename?: 'Query' }
  & { categories: Array<(
    { __typename?: 'Category' }
    & Pick<Category, 'id' | 'name'>
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & UserFragmentFragment
  )> }
);

export type ProjectsQueryVariables = Exact<{
  categoryId?: Maybe<Scalars['Int']>;
  limit: Scalars['Float'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type ProjectsQuery = (
  { __typename?: 'Query' }
  & { projects: Array<(
    { __typename?: 'Project' }
    & Pick<Project, 'id' | 'createdAt' | 'title' | 'text' | 'categoryId'>
  )> }
);

export const UserFragmentFragmentDoc = gql`
    fragment UserFragment on User {
  id
  username
}
    `;
export const CreateProjectDocument = gql`
    mutation createProject($title: String!, $text: String!, $categoryId: Float!, $tags: String!) {
  createProject(
    input: {title: $title, text: $text, categoryId: $categoryId, tags: $tags}
  ) {
    errors {
      field
      message
    }
    project {
      id
    }
  }
}
    `;

export function useCreateProjectMutation() {
  return Urql.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument);
};
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    user {
      ...UserFragment
    }
    errors {
      field
      message
    }
  }
}
    ${UserFragmentFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($options: RegistrationInput!) {
  register(options: $options) {
    user {
      ...UserFragment
    }
    errors {
      field
      message
    }
  }
}
    ${UserFragmentFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const CategoriesDocument = gql`
    query Categories {
  categories {
    id
    name
  }
}
    `;

export function useCategoriesQuery(options: Omit<Urql.UseQueryArgs<CategoriesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CategoriesQuery>({ query: CategoriesDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const ProjectsDocument = gql`
    query Projects($categoryId: Int, $limit: Float!, $cursor: String) {
  projects(category: $categoryId, limit: $limit, cursor: $cursor) {
    id
    createdAt
    title
    text
    categoryId
  }
}
    `;

export function useProjectsQuery(options: Omit<Urql.UseQueryArgs<ProjectsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ProjectsQuery>({ query: ProjectsDocument, ...options });
};