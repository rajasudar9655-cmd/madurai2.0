# Security Specification - Madurai Info AI

## Data Invariants
1. A ChatSession must always belong to the authenticated user attempting the write.
2. User profile data must correspond strictly to the `request.auth.uid`.
3. All string fields have size limits to prevent resource exhaustion.
4. Document IDs must match the expected alphanumeric format.

## The "Dirty Dozen" Payloads (Deny cases)
1. **Identity Theft**: User A tries to read/write `users/UserB` profile.
2. **History Hijack**: User A tries to read `users/UserB/chats/Chat1`.
3. **Shadow Field**: Creating a user with an extra `isAdmin: true` field.
4. **ID Poisoning**: Creating a chat with a 2MB string as the document ID.
5. **Type Mismatch**: Sending a `lastUpdated` as a boolean instead of string.
6. **Self-Promotion**: Authenticated user trying to update `role` to 'admin' (if we had roles).
7. **Massive Content**: Sending a message with 1MB of text.
8. **Impersonation**: User A path with `userId: UserB` in the data body.
9. **Orphaned Write**: Writing a chat without being signed in.
10. **Timestamp Spoofing**: Sending a `lastUpdated` from 10 years ago to bypass TTL logic (if any).
11. **Key Omission**: Creating a chat session without the `title` field.
12. **Blanket Read**: Trying to list all `users` in the root.

## Verified Tests
- [ ] `get /users/otherUser` -> PERMISSION_DENIED
- [ ] `create /users/myUser` with valid data -> ALLOW
- [ ] `create /users/myUser/chats/myChat` with valid data -> ALLOW
- [ ] `update /users/myUser/chats/myChat` with valid data -> ALLOW
- [ ] `delete /users/myUser/chats/myChat` -> ALLOW
