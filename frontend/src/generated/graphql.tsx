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
  projects: PaginatedProjects;
  project?: Maybe<Project>;
  me?: Maybe<User>;
  isAdmin: Scalars['Boolean'];
};


export type QueryCategoryByIdArgs = {
  id: Scalars['Float'];
};


export type QueryProjectsArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
  category?: Maybe<Scalars['Int']>;
};


export type QueryProjectArgs = {
  id: Scalars['Int'];
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
  author: User;
  categoryId: Scalars['Float'];
  createdAt: Scalars['Timestamp'];
  updatedAt: Scalars['Timestamp'];
  snippet: SnippetResponse;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  username: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  school: Scalars['String'];
  location: Scalars['String'];
  bio: Scalars['String'];
  link: Scalars['String'];
  projects: Array<Project>;
  createdAt: Scalars['Timestamp'];
  updatedAt: Scalars['Timestamp'];
};


export type SnippetResponse = {
  __typename?: 'SnippetResponse';
  content: Scalars['String'];
  isTrimmed: Scalars['Boolean'];
};

export type PaginatedProjects = {
  __typename?: 'PaginatedProjects';
  projects: Array<Project>;
  hasMore: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  adminCreateCategory: Category;
  createProject: CreateProjectResponse;
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  changeAdminStatus: Scalars['Boolean'];
  updateBio: Scalars['Boolean'];
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


export type MutationUpdateBioArgs = {
  input: BioInput;
};

export type CreateProjectResponse = {
  __typename?: 'CreateProjectResponse';
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

export type BioInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  school: Scalars['String'];
  location: Scalars['String'];
  bio: Scalars['String'];
  link: Scalars['String'];
};

export type UserFragmentFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username'>
);

export type CreateProjectMutationVariables = Exact<{
  title: Scalars['String'];
  text: Scalars['String'];
  categoryId: Scalars['Float'];
}>;


export type CreateProjectMutation = (
  { __typename?: 'Mutation' }
  & { createProject: (
    { __typename?: 'CreateProjectResponse' }
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

export type UpdateBioMutationVariables = Exact<{
  input: BioInput;
}>;


export type UpdateBioMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateBio'>
);

export type BioQueryVariables = Exact<{ [key: string]: never; }>;


export type BioQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'firstName' | 'lastName' | 'school' | 'location' | 'bio' | 'link'>
  )> }
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

export type ProjectQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ProjectQuery = (
  { __typename?: 'Query' }
  & { project?: Maybe<(
    { __typename?: 'Project' }
    & Pick<Project, 'id' | 'createdAt' | 'title' | 'text' | 'categoryId'>
  )> }
);

export type ProjectsQueryVariables = Exact<{
  categoryId?: Maybe<Scalars['Int']>;
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type ProjectsQuery = (
  { __typename?: 'Query' }
  & { projects: (
    { __typename?: 'PaginatedProjects' }
    & Pick<PaginatedProjects, 'hasMore'>
    & { projects: Array<(
      { __typename?: 'Project' }
      & Pick<Project, 'id' | 'createdAt' | 'title' | 'categoryId'>
      & { snippet: (
        { __typename?: 'SnippetResponse' }
        & Pick<SnippetResponse, 'isTrimmed' | 'content'>
      ) }
    )> }
  ) }
);

export const UserFragmentFragmentDoc = gql`
    fragment UserFragment on User {
  id
  username
}
    `;
export const CreateProjectDocument = gql`
    mutation createProject($title: String!, $text: String!, $categoryId: Float!) {
  createProject(input: {title: $title, text: $text, categoryId: $categoryId}) {
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
export const UpdateBioDocument = gql`
    mutation UpdateBio($input: BioInput!) {
  updateBio(input: $input)
}
    `;

export function useUpdateBioMutation() {
  return Urql.useMutation<UpdateBioMutation, UpdateBioMutationVariables>(UpdateBioDocument);
};
export const BioDocument = gql`
    query Bio {
  me {
    firstName
    lastName
    school
    location
    bio
    link
  }
}
    `;

export function useBioQuery(options: Omit<Urql.UseQueryArgs<BioQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<BioQuery>({ query: BioDocument, ...options });
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
export const ProjectDocument = gql`
    query Project($id: Int!) {
  project(id: $id) {
    id
    createdAt
    title
    text
    categoryId
  }
}
    `;

export function useProjectQuery(options: Omit<Urql.UseQueryArgs<ProjectQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ProjectQuery>({ query: ProjectDocument, ...options });
};
export const ProjectsDocument = gql`
    query Projects($categoryId: Int, $limit: Int!, $cursor: String) {
  projects(category: $categoryId, limit: $limit, cursor: $cursor) {
    hasMore
    projects {
      id
      createdAt
      title
      snippet {
        isTrimmed
        content
      }
      categoryId
    }
  }
}
    `;

export function useProjectsQuery(options: Omit<Urql.UseQueryArgs<ProjectsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ProjectsQuery>({ query: ProjectsDocument, ...options });
};