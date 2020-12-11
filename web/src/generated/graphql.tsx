import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  incidentReports: PaginatedReports;
  IncidentReport?: Maybe<IncidentReport>;
  me?: Maybe<User>;
};


export type QueryIncidentReportsArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryIncidentReportArgs = {
  id: Scalars['Int'];
};

export type PaginatedReports = {
  __typename?: 'PaginatedReports';
  incidentReports: Array<IncidentReport>;
  hasMore: Scalars['Boolean'];
};

export type IncidentReport = {
  __typename?: 'IncidentReport';
  id: Scalars['Int'];
  title: Scalars['String'];
  creatorId: Scalars['Int'];
  creator: User;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  isReviewed?: Maybe<Scalars['String']>;
  reviewer?: Maybe<Scalars['String']>;
  reviewDate?: Maybe<Scalars['String']>;
  incidentDatetime: Scalars['String'];
  incidentLocation: Scalars['String'];
  incidentDetails: Scalars['String'];
  incidentWitnesses: Scalars['String'];
  take5Completed: Scalars['String'];
  SWMScompleted: Scalars['String'];
  fatiguePlanCompleted: Scalars['String'];
  siteProceduresFollowed: Scalars['String'];
  injurySustained: Scalars['String'];
  equipmentDamaged: Scalars['String'];
  injuryNature: Scalars['String'];
  injuryAgency: Scalars['String'];
  stoppedWork: Scalars['String'];
  treatmentRecieved: Scalars['String'];
  treatmentDetails: Scalars['String'];
  equipmentCompany: Scalars['String'];
  equipmentItem: Scalars['String'];
  damageDetails: Scalars['String'];
  causalFactors: Scalars['String'];
  recurrenceLiklihood: Scalars['String'];
  outcomeSeverity: Scalars['String'];
  resultingRisk: Scalars['String'];
  actionsTaken: Scalars['String'];
  actionDate: Scalars['String'];
  actionPerson: Scalars['String'];
  textSnippet: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  username: Scalars['String'];
  email: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  reviewIncidentReport: Scalars['Boolean'];
  createIncidentReport: IncidentReport;
  updateIncidentReport?: Maybe<IncidentReport>;
  deleteIncidentReport: Scalars['Boolean'];
  changePassword: UserResponse;
  forgotPassword: Scalars['Boolean'];
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
};


export type MutationReviewIncidentReportArgs = {
  id: Scalars['Int'];
  username: Scalars['String'];
};


export type MutationCreateIncidentReportArgs = {
  input: IncidentReportInput;
};


export type MutationUpdateIncidentReportArgs = {
  input: IncidentReportInput;
  id: Scalars['Int'];
};


export type MutationDeleteIncidentReportArgs = {
  id: Scalars['Int'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};

export type IncidentReportInput = {
  title: Scalars['String'];
  incidentDatetime: Scalars['String'];
  incidentLocation: Scalars['String'];
  incidentDetails: Scalars['String'];
  incidentWitnesses: Scalars['String'];
  take5Completed: Scalars['String'];
  SWMScompleted: Scalars['String'];
  fatiguePlanCompleted: Scalars['String'];
  siteProceduresFollowed: Scalars['String'];
  injurySustained: Scalars['String'];
  equipmentDamaged: Scalars['String'];
  injuryNature: Scalars['String'];
  injuryAgency: Scalars['String'];
  stoppedWork: Scalars['String'];
  treatmentRecieved: Scalars['String'];
  treatmentDetails: Scalars['String'];
  equipmentCompany: Scalars['String'];
  equipmentItem: Scalars['String'];
  damageDetails: Scalars['String'];
  causalFactors: Scalars['String'];
  recurrenceLiklihood: Scalars['String'];
  outcomeSeverity: Scalars['String'];
  resultingRisk: Scalars['String'];
  actionsTaken: Scalars['String'];
  actionDate: Scalars['String'];
  actionPerson: Scalars['String'];
  isReviewed?: Maybe<Scalars['String']>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type UsernamePasswordInput = {
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
};

export type IncidentReportFragment = (
  { __typename?: 'IncidentReport' }
  & Pick<IncidentReport, 'id' | 'title' | 'createdAt' | 'reviewer' | 'isReviewed' | 'reviewDate' | 'incidentDatetime' | 'incidentLocation' | 'incidentDetails' | 'incidentWitnesses' | 'take5Completed' | 'SWMScompleted' | 'fatiguePlanCompleted' | 'siteProceduresFollowed' | 'injurySustained' | 'equipmentDamaged' | 'injuryNature' | 'injuryAgency' | 'stoppedWork' | 'treatmentRecieved' | 'treatmentDetails' | 'equipmentItem' | 'equipmentCompany' | 'damageDetails' | 'causalFactors' | 'resultingRisk' | 'recurrenceLiklihood' | 'outcomeSeverity' | 'actionsTaken' | 'actionDate' | 'actionPerson'>
  & { creator: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
  ) }
);

export type IncidentReportSnippetFragment = (
  { __typename?: 'IncidentReport' }
  & Pick<IncidentReport, 'id' | 'title' | 'createdAt' | 'isReviewed' | 'textSnippet'>
  & { creator: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
  ) }
);

export type RegularErrorFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username'>
);

export type RegularUserResponseFragment = (
  { __typename?: 'UserResponse' }
  & { errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & RegularErrorFragment
  )>>, user?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type CreateIncidentReportMutationVariables = Exact<{
  input: IncidentReportInput;
}>;


export type CreateIncidentReportMutation = (
  { __typename?: 'Mutation' }
  & { createIncidentReport: (
    { __typename?: 'IncidentReport' }
    & Pick<IncidentReport, 'id' | 'createdAt' | 'updatedAt' | 'title' | 'incidentDatetime' | 'incidentLocation' | 'incidentDetails' | 'incidentWitnesses' | 'take5Completed' | 'SWMScompleted' | 'siteProceduresFollowed' | 'fatiguePlanCompleted' | 'injurySustained' | 'equipmentDamaged' | 'equipmentCompany' | 'equipmentItem' | 'damageDetails' | 'causalFactors' | 'recurrenceLiklihood' | 'outcomeSeverity' | 'resultingRisk' | 'actionsTaken' | 'actionDate' | 'actionPerson' | 'isReviewed'>
  ) }
);

export type DeleteIncidentReportMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteIncidentReportMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteIncidentReport'>
);

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type ReviewIncidentReportMutationVariables = Exact<{
  id: Scalars['Int'];
  username: Scalars['String'];
}>;


export type ReviewIncidentReportMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'reviewIncidentReport'>
);

export type UpdateIncidentReportMutationVariables = Exact<{
  input: IncidentReportInput;
  id: Scalars['Int'];
}>;


export type UpdateIncidentReportMutation = (
  { __typename?: 'Mutation' }
  & { updateIncidentReport?: Maybe<(
    { __typename?: 'IncidentReport' }
    & Pick<IncidentReport, 'id' | 'createdAt' | 'updatedAt' | 'title' | 'incidentDatetime' | 'incidentLocation' | 'incidentDetails' | 'incidentWitnesses' | 'take5Completed' | 'SWMScompleted' | 'siteProceduresFollowed' | 'fatiguePlanCompleted' | 'injurySustained' | 'equipmentDamaged' | 'equipmentCompany' | 'equipmentItem' | 'damageDetails' | 'causalFactors' | 'recurrenceLiklihood' | 'outcomeSeverity' | 'resultingRisk' | 'actionsTaken' | 'actionDate' | 'actionPerson' | 'isReviewed'>
  )> }
);

export type IncidentReportQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type IncidentReportQuery = (
  { __typename?: 'Query' }
  & { IncidentReport?: Maybe<(
    { __typename?: 'IncidentReport' }
    & IncidentReportFragment
  )> }
);

export type IncidentReportsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type IncidentReportsQuery = (
  { __typename?: 'Query' }
  & { incidentReports: (
    { __typename?: 'PaginatedReports' }
    & Pick<PaginatedReports, 'hasMore'>
    & { incidentReports: Array<(
      { __typename?: 'IncidentReport' }
      & IncidentReportSnippetFragment
    )> }
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export const IncidentReportFragmentDoc = gql`
    fragment IncidentReport on IncidentReport {
  id
  title
  creator {
    id
    username
  }
  createdAt
  reviewer
  isReviewed
  reviewDate
  incidentDatetime
  incidentLocation
  incidentDetails
  incidentWitnesses
  take5Completed
  SWMScompleted
  fatiguePlanCompleted
  siteProceduresFollowed
  injurySustained
  equipmentDamaged
  injuryNature
  injuryAgency
  stoppedWork
  treatmentRecieved
  treatmentDetails
  equipmentItem
  equipmentCompany
  damageDetails
  causalFactors
  resultingRisk
  recurrenceLiklihood
  outcomeSeverity
  actionsTaken
  actionDate
  actionPerson
}
    `;
export const IncidentReportSnippetFragmentDoc = gql`
    fragment IncidentReportSnippet on IncidentReport {
  id
  title
  creator {
    id
    username
  }
  createdAt
  isReviewed
  textSnippet
}
    `;
export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  username
}
    `;
export const RegularUserResponseFragmentDoc = gql`
    fragment RegularUserResponse on UserResponse {
  errors {
    ...RegularError
  }
  user {
    ...RegularUser
  }
}
    ${RegularErrorFragmentDoc}
${RegularUserFragmentDoc}`;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $newPassword: String!) {
  changePassword(token: $token, newPassword: $newPassword) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      token: // value for 'token'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, baseOptions);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const CreateIncidentReportDocument = gql`
    mutation CreateIncidentReport($input: IncidentReportInput!) {
  createIncidentReport(input: $input) {
    id
    createdAt
    updatedAt
    title
    incidentDatetime
    incidentLocation
    incidentDetails
    incidentWitnesses
    take5Completed
    SWMScompleted
    siteProceduresFollowed
    fatiguePlanCompleted
    injurySustained
    equipmentDamaged
    equipmentCompany
    equipmentItem
    damageDetails
    causalFactors
    recurrenceLiklihood
    outcomeSeverity
    resultingRisk
    actionsTaken
    actionDate
    actionPerson
    isReviewed
  }
}
    `;
export type CreateIncidentReportMutationFn = Apollo.MutationFunction<CreateIncidentReportMutation, CreateIncidentReportMutationVariables>;

/**
 * __useCreateIncidentReportMutation__
 *
 * To run a mutation, you first call `useCreateIncidentReportMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateIncidentReportMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createIncidentReportMutation, { data, loading, error }] = useCreateIncidentReportMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateIncidentReportMutation(baseOptions?: Apollo.MutationHookOptions<CreateIncidentReportMutation, CreateIncidentReportMutationVariables>) {
        return Apollo.useMutation<CreateIncidentReportMutation, CreateIncidentReportMutationVariables>(CreateIncidentReportDocument, baseOptions);
      }
export type CreateIncidentReportMutationHookResult = ReturnType<typeof useCreateIncidentReportMutation>;
export type CreateIncidentReportMutationResult = Apollo.MutationResult<CreateIncidentReportMutation>;
export type CreateIncidentReportMutationOptions = Apollo.BaseMutationOptions<CreateIncidentReportMutation, CreateIncidentReportMutationVariables>;
export const DeleteIncidentReportDocument = gql`
    mutation DeleteIncidentReport($id: Int!) {
  deleteIncidentReport(id: $id)
}
    `;
export type DeleteIncidentReportMutationFn = Apollo.MutationFunction<DeleteIncidentReportMutation, DeleteIncidentReportMutationVariables>;

/**
 * __useDeleteIncidentReportMutation__
 *
 * To run a mutation, you first call `useDeleteIncidentReportMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteIncidentReportMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteIncidentReportMutation, { data, loading, error }] = useDeleteIncidentReportMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteIncidentReportMutation(baseOptions?: Apollo.MutationHookOptions<DeleteIncidentReportMutation, DeleteIncidentReportMutationVariables>) {
        return Apollo.useMutation<DeleteIncidentReportMutation, DeleteIncidentReportMutationVariables>(DeleteIncidentReportDocument, baseOptions);
      }
export type DeleteIncidentReportMutationHookResult = ReturnType<typeof useDeleteIncidentReportMutation>;
export type DeleteIncidentReportMutationResult = Apollo.MutationResult<DeleteIncidentReportMutation>;
export type DeleteIncidentReportMutationOptions = Apollo.BaseMutationOptions<DeleteIncidentReportMutation, DeleteIncidentReportMutationVariables>;
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      usernameOrEmail: // value for 'usernameOrEmail'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($options: UsernamePasswordInput!) {
  register(options: $options) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const ReviewIncidentReportDocument = gql`
    mutation reviewIncidentReport($id: Int!, $username: String!) {
  reviewIncidentReport(id: $id, username: $username)
}
    `;
export type ReviewIncidentReportMutationFn = Apollo.MutationFunction<ReviewIncidentReportMutation, ReviewIncidentReportMutationVariables>;

/**
 * __useReviewIncidentReportMutation__
 *
 * To run a mutation, you first call `useReviewIncidentReportMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReviewIncidentReportMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reviewIncidentReportMutation, { data, loading, error }] = useReviewIncidentReportMutation({
 *   variables: {
 *      id: // value for 'id'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useReviewIncidentReportMutation(baseOptions?: Apollo.MutationHookOptions<ReviewIncidentReportMutation, ReviewIncidentReportMutationVariables>) {
        return Apollo.useMutation<ReviewIncidentReportMutation, ReviewIncidentReportMutationVariables>(ReviewIncidentReportDocument, baseOptions);
      }
export type ReviewIncidentReportMutationHookResult = ReturnType<typeof useReviewIncidentReportMutation>;
export type ReviewIncidentReportMutationResult = Apollo.MutationResult<ReviewIncidentReportMutation>;
export type ReviewIncidentReportMutationOptions = Apollo.BaseMutationOptions<ReviewIncidentReportMutation, ReviewIncidentReportMutationVariables>;
export const UpdateIncidentReportDocument = gql`
    mutation UpdateIncidentReport($input: IncidentReportInput!, $id: Int!) {
  updateIncidentReport(input: $input, id: $id) {
    id
    createdAt
    updatedAt
    title
    incidentDatetime
    incidentLocation
    incidentDetails
    incidentWitnesses
    take5Completed
    SWMScompleted
    siteProceduresFollowed
    fatiguePlanCompleted
    injurySustained
    equipmentDamaged
    equipmentCompany
    equipmentItem
    damageDetails
    causalFactors
    recurrenceLiklihood
    outcomeSeverity
    resultingRisk
    actionsTaken
    actionDate
    actionPerson
    isReviewed
  }
}
    `;
export type UpdateIncidentReportMutationFn = Apollo.MutationFunction<UpdateIncidentReportMutation, UpdateIncidentReportMutationVariables>;

/**
 * __useUpdateIncidentReportMutation__
 *
 * To run a mutation, you first call `useUpdateIncidentReportMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateIncidentReportMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateIncidentReportMutation, { data, loading, error }] = useUpdateIncidentReportMutation({
 *   variables: {
 *      input: // value for 'input'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdateIncidentReportMutation(baseOptions?: Apollo.MutationHookOptions<UpdateIncidentReportMutation, UpdateIncidentReportMutationVariables>) {
        return Apollo.useMutation<UpdateIncidentReportMutation, UpdateIncidentReportMutationVariables>(UpdateIncidentReportDocument, baseOptions);
      }
export type UpdateIncidentReportMutationHookResult = ReturnType<typeof useUpdateIncidentReportMutation>;
export type UpdateIncidentReportMutationResult = Apollo.MutationResult<UpdateIncidentReportMutation>;
export type UpdateIncidentReportMutationOptions = Apollo.BaseMutationOptions<UpdateIncidentReportMutation, UpdateIncidentReportMutationVariables>;
export const IncidentReportDocument = gql`
    query IncidentReport($id: Int!) {
  IncidentReport(id: $id) {
    ...IncidentReport
  }
}
    ${IncidentReportFragmentDoc}`;

/**
 * __useIncidentReportQuery__
 *
 * To run a query within a React component, call `useIncidentReportQuery` and pass it any options that fit your needs.
 * When your component renders, `useIncidentReportQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIncidentReportQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useIncidentReportQuery(baseOptions: Apollo.QueryHookOptions<IncidentReportQuery, IncidentReportQueryVariables>) {
        return Apollo.useQuery<IncidentReportQuery, IncidentReportQueryVariables>(IncidentReportDocument, baseOptions);
      }
export function useIncidentReportLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IncidentReportQuery, IncidentReportQueryVariables>) {
          return Apollo.useLazyQuery<IncidentReportQuery, IncidentReportQueryVariables>(IncidentReportDocument, baseOptions);
        }
export type IncidentReportQueryHookResult = ReturnType<typeof useIncidentReportQuery>;
export type IncidentReportLazyQueryHookResult = ReturnType<typeof useIncidentReportLazyQuery>;
export type IncidentReportQueryResult = Apollo.QueryResult<IncidentReportQuery, IncidentReportQueryVariables>;
export const IncidentReportsDocument = gql`
    query IncidentReports($limit: Int!, $cursor: String) {
  incidentReports(limit: $limit, cursor: $cursor) {
    hasMore
    incidentReports {
      ...IncidentReportSnippet
    }
  }
}
    ${IncidentReportSnippetFragmentDoc}`;

/**
 * __useIncidentReportsQuery__
 *
 * To run a query within a React component, call `useIncidentReportsQuery` and pass it any options that fit your needs.
 * When your component renders, `useIncidentReportsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIncidentReportsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useIncidentReportsQuery(baseOptions: Apollo.QueryHookOptions<IncidentReportsQuery, IncidentReportsQueryVariables>) {
        return Apollo.useQuery<IncidentReportsQuery, IncidentReportsQueryVariables>(IncidentReportsDocument, baseOptions);
      }
export function useIncidentReportsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IncidentReportsQuery, IncidentReportsQueryVariables>) {
          return Apollo.useLazyQuery<IncidentReportsQuery, IncidentReportsQueryVariables>(IncidentReportsDocument, baseOptions);
        }
export type IncidentReportsQueryHookResult = ReturnType<typeof useIncidentReportsQuery>;
export type IncidentReportsLazyQueryHookResult = ReturnType<typeof useIncidentReportsLazyQuery>;
export type IncidentReportsQueryResult = Apollo.QueryResult<IncidentReportsQuery, IncidentReportsQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;