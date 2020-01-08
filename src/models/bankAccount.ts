import {
	Model,
	Column,
	Table,
	CreatedAt,
	UpdatedAt,
    BelongsTo,
    ForeignKey,
    Is,
    DeletedAt
} from 'sequelize-typescript';
import { User } from './user';
import { AccountType } from '../types/accountTypes';

@Table
export class BankAccount extends Model<BankAccount> {
    @ForeignKey(() => User)
    @Column
    UserId!: number;

    @Is('AccountType', (value) => {
        if (!AccountType[value]) {
            throw new Error(`Account Type must be one of ${AccountType}`);
        }
      })
    @Column({
        allowNull: false
    })
    AccountType!: number;
    
    @Column({
        allowNull: false
    })
    Amount!: number;
    
    @Column
    Enabled!: boolean;

    @CreatedAt
    CreatedAt!: Date;

    @UpdatedAt
    UpdatedAt!: Date;

    @DeletedAt
    DeletedAt!: Date;

    @BelongsTo(() => User)
    user: User;
}

