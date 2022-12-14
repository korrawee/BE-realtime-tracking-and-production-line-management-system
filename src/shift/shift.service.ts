import { Injectable } from '@nestjs/common';
import { dbResponse } from 'src/db/db.response.type';
import { ShiftforDashboardDto } from './dto/ShiftForDashboard.dto';
import { ShiftforDashboardAttrDto } from './dto/ShiftForDashboardAttr.dto';
import { ShiftInDepartmentDto } from './dto/ShiftInDepartment.dto';
import { Client } from 'pg';
import { InjectClient } from 'nest-postgres';

@Injectable()
export class ShiftService {
    constructor(@InjectClient() private readonly cnn: Client){}

    async getShiftsById(departmentsId: string[]){

        const result: Promise<ShiftforDashboardDto[]> = Promise.all(departmentsId.map(async (departmentId: string)=>{

            const query: string = `select shift_code from _controls where department_id='${departmentId}'`;

            const shiftInDepartment: ShiftforDashboardDto = await this.cnn.query(query)

            .then(async (res: dbResponse) => {
                console.log(await this.getshifts(res.rows).then((res)=>(res)));
                return await this.getshifts(res.rows).then((res)=>(res));
            })
            .catch((error) => {
                console.error(error);
                return {status: 200, message: error.message};
            });
            return shiftInDepartment;
        }));
        
        console.log(await result);
        return await result;
    }

    public async getshifts(shiftInDepartment: ShiftInDepartmentDto[]) {
        
        const data: Promise<ShiftforDashboardDto[]> = Promise.all(shiftInDepartment.map(async (obj: ShiftInDepartmentDto) => {
        // return Promise.all(shiftInDepartment.map(async (obj: ShiftInDepartmentDto) => {
            const query = `
                            select shift_code, success_product,
                            all_member, checkin_member
                            from shifts 
                            where shift_code='${+obj.shift_code}'
                        `
            const shift =  await this.cnn.query(query)
                .then((res: dbResponse) => {
                    
                    return res.rows.pop();
                })
                .then((shift: ShiftforDashboardAttrDto) => {
                    const res: ShiftforDashboardDto = {
                        shiftCode: shift.shift_code,
                        successProduct: shift.success_product,
                        allMember: shift.all_member,
                        checkInMember: shift.checkin_member,
                    }

                    return res;
                })
                .catch((error) => {

                    console.error(error);
                    return {status: 200, message: error.message};
                });

            return shift;
        })).then(res=>{
            
            return res;
        });

        return data.then((res)=>(res.pop()));
    }
}
