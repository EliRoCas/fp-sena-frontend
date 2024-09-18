import { userRoleAssign } from './users.service';
import { UserModel, RoleModel, RoleAssignModel, DocTypeModel } from './users.service';

describe('userRoleAssign selector', () => {
  it('should return users with roles and documents assigned correctly', () => {
    const mockUsers: UserModel[] = [
      { id_user: 1, user_name: 'John', user_lastname: 'Doe', fo_document_type: 1, document_number: 123456, email: 'john.doe@example.com', password: 'password' }
    ];
    const mockUserRoles: RoleModel[] = [
      { id_user_role: 1, role_name: 'Admin' }
    ];
    const mockUserRolesAssignment: RoleAssignModel[] = [
      { fo_user: 1, fo_user_role: 1 }
    ];
    const mockDocuments: DocTypeModel[] = [
      { id_document_type: 1, document_type_name: 'Passport' }
    ];

    const result = userRoleAssign.projector(
      mockUsers,
      mockUserRoles,
      mockUserRolesAssignment,
      mockDocuments
    );

    expect(result[0].roleNames).toEqual('Admin');
    expect(result[0].doc_Name).toEqual('Passport');
  });
});